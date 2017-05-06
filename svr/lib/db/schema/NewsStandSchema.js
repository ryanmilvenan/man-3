import mongoose from 'mongoose';
import { newsContainerSchema } from './NewsContainerSchema.js';
import { processEntries } from '../../parser.js';
const Schema = mongoose.Schema;

const newsStandSchema = new Schema({
  newsContainers: [newsContainerSchema]
});

newsStandSchema.statics.refreshSources = async (data) => {
  let docs, newsStand;
  try {
    docs = await NewsStand.find({}); 
  } catch (err) {
    console.error(`ERROR FINDING SOURCES DURING REFRESH: ${err}`) 
  }

  if(!docs.length) {
    newsStand = new NewsStand(data);
  } else {
    let currentState = docs[0];
    currentState.newsContainers = data.newsContainers;
    newsStand = currentState;
  }

  try {
    return await newsStand.save();
  } catch (err) {
    console.error(`ERROR SAVING SOURCES DURING REFRESH: ${err}`) 
  }
}

newsStandSchema.statics.fetchNewsContainers = async () => {
  let docs, containers;
  try {
    docs = await NewsStand.find({}); 
  } catch (err) {
    console.error(`ERROR FINDING SOURCES DURING FETCH: ${err}`) 
  }

  if(!docs.length) {
    containers = [];
    return containers;
  } else {
    let currentState = docs[0];
    return currentState.newsContainers;
  }
}

newsStandSchema.statics.deleteNewsContainer = async (id) => {
  let docs, currentState;
  try {
    docs = await NewsStand.find({});
  } catch (err) {
    console.error(`ERROR FINDING SOURCES DURING DELETE: ${err}`) 
    return [];
  }

  currentState = docs[0];
  if(currentState.newsContainers[id]) {
    currentState.newsContainers = [
      ...currentState.newsContainers.slice(0, id),
      ...currentState.newsContainers.slice(id + 1)
    ]
  }

  try {
    return await currentState.save();
  } catch (err) {
    console.error(`ERROR SAVING SOURCES DURING DELETE: ${err}`) 
    return [];
  }
}

newsStandSchema.statics.saveProcessedEntries = async (entries, id) => {
  let docs, currentState;
  try {
    docs = await NewsStand.find({});
  } catch (err) {
    console.error(`ERROR FINDING SOURCES DURING REFRESH: ${err}`) 
    return {};
  }


  let newsStand = docs[0];
  const container = newsStand.newsContainers[id] || {};
  const newContainer = Object.assign(
    container,
    {
      ...container,
      items: entries
    }
  );

  if(newsStand.newsContainers[id]) {
    newsStand.newsContainers = [
      ...newsStand.newsContainers.slice(0, id),
      newContainer,
      ...newsStand.newsContainers.slice(id + 1)
    ];
  } else {
    newsStand.newsContainers = [
      ...newsStand.newsContainers,
      newContainer
    ];
  }

  try {
    return await newsStand.save();
  } catch (err) {
    console.error(`ERROR SAVING SOURCES DURING REFRESH: ${err}`) 
    return {};
  }

}


const NewsStand = mongoose.model("NewsStand", newsStandSchema);

export default NewsStand;
