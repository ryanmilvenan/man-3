import mongoose from 'mongoose';
import { newsContainerSchema } from './NewsContainerSchema.js';
const Schema = mongoose.Schema;

const newsStandSchema = new Schema({
  newsContainers: [newsContainerSchema]
});


newsStandSchema.statics.persistState = async (data) => {
  let docs, containers;
  try {
    docs = await NewsStand.find({}); 
  } catch (err) {
    console.error(`ERROR FINDING SOURCES DURING PERSIST: ${err}`)
  }

  if(!docs.length) {
    containers = new NewsStand(data);
  } else {
    containers = docs[0];
    containers.newsContainers = data;
  }

  try {
    return await containers.save();
  } catch (err) {
    console.error(`ERROR SAVING SOURCES DURING PERSIST: ${err}`)
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
    const newsContainers = currentState.newsContainers.map(n =>
      n.toObject()
    );
    return newsContainers;
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

const NewsStand = mongoose.model("NewsStand", newsStandSchema);

export default NewsStand;
