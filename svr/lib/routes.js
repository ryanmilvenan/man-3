import express from 'express';
import jwt from 'express-jwt';
import reader from 'feed-reader';
import { processEntries } from './parser.js';
import db from './db/index.js';
import NewsStand from './db/schema/NewsStandSchema.js';

var jwtCheck = jwt({
    secret: new Buffer('0Jf2Q60m7BvhJ6Zd8Bf55GanUZ1cqwi4ZcvPbYgOSxlp93kGXh0K8amu88gdrjze', 'base64'),
    // audience: 'https://www.carnivalinparadise.com',
    issuer: "https://carnivalinparadise.auth0.com/"
});

const routes = express.Router();

routes.get('/refresh/:url', (req, res) => {
  const { url } = req.params;
  reader.parse(url).then((feed) => {
    feed.entries = processEntries(feed.entries);
    res.send({ data: { feed, err: null } });
  }).catch((err) => {
    console.error("ERROR REFRESHING SOURCE", err)
    res.send({ data: { feed: null, err } });
  });
});

routes.get('/state', jwtCheck, (req, res) => {
  const { user } = req;
  NewsStand.fetchNewsContainers({ user: user.email }).then((containers) => {
    res.send({ data: { state: containers } });
  }).catch((err) => {
    console.error(`ERROR FETCHING STATE: ${err}`)
    res.send({ data: { state: [], err } });
  });
});

routes.get('/default-state', (req, res) => {
  NewsStand.fetchNewsContainers({}).then((containers) => {
    res.send({ data: { state: containers } });
  }).catch((err) => {
    console.error(`ERROR FETCHING STATE: ${err}`)
    res.send({ data: { state: [], err } });
  });
});

routes.post('/delete', jwtCheck, (req, res) => {
  const { email } = req.user;
  const { id } = req.body;
  NewsStand.deleteNewsContainer(id, email).then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.error(`ERROR DELETING ITEM ${id}: ${err}`)
    res.send({ data: { err } });
  });
});

routes.post('/rearrange', jwtCheck, (req, res) => {
  const { email } = req.user;
  const { id, direction} = req.body;
  NewsStand.rearrangeContainer(id, direction, email).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(`ERROR REARRANGING ITEM ${id}: ${err}`)
    res.send({ data: { err } });
  });
});

routes.post('/persist', jwtCheck, (req, res) => {
  const { email } = req.user;
  const { state } = req.body;
  let admin = {};
  if(process.env.AUTHORIZATION === 'admin') {
    admin = { user: 'default'}
  }
  const data = Object.assign({}, { newsContainers: state }, { user: email }, admin);
  NewsStand.persistState(data).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(`ERROR PERSISTING STATE: ${err}`)
  });
});

export default routes;