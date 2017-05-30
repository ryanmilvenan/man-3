import express from 'express';
import reader from 'feed-reader';
import { processEntries } from './parser.js';

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

routes.post('/delete', (req, res) => {});

export default routes;