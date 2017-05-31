import express from 'express';
import reader from 'feed-reader';
import { processEntries } from './parser.js';
import db from './db/index.js';
import NewsStand from './db/schema/NewsStandSchema.js';

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

routes.get('/state', (req, res) => {
  NewsStand.fetchNewsContainers().then((containers) => {
    res.send({ data: { state: containers } });
  }).catch((err) => {
    console.error(`ERROR FETCHING STATE: ${err}`)
    res.send({ data: { state: [], err } });
  });
});

routes.post('/delete', (req, res) => {
  const { id } = req.body;
  NewsStand.deleteNewsContainer(id).then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.error(`ERROR DELETING ITEM ${id}: ${err}`)
    res.send({ data: { err } });
  });
});

routes.post('/rearrange', (req, res) => {
  const { id, direction } = req.body;
  NewsStand.rearrangeContainer(id, direction).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(`ERROR REARRANGING ITEM ${id}: ${err}`)
    res.send({ data: { err } });
  });
});

routes.post('/persist', (req, res) => {
  const { state } = req.body;
  NewsStand.persistState(state).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(`ERROR PERSISTING STATE: ${err}`)
  });
});

export default routes;