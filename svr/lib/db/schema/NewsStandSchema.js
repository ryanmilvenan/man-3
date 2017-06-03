import mongoose from 'mongoose';
import { newsContainerSchema } from './NewsContainerSchema.js';
const Schema = mongoose.Schema;

const newsStandSchema = new Schema({
  newsContainers: [newsContainerSchema],
  user: String
});


newsStandSchema.statics.persistState = async (data) => {
  const { user, newsContainers } = data;
  let docs, containers;
  try {
    docs = await NewsStand.find({ user }); 
  } catch (err) {
    console.error(`ERROR FINDING SOURCES DURING PERSIST: ${err}`)
  }

  if(!docs.length) {
    containers = new NewsStand(data);
  } else {
    containers = docs[0];
    containers.newsContainers = data.newsContainers;
  }

  try {
    return await containers.save();
  } catch (err) {
    console.error(`ERROR SAVING SOURCES DURING PERSIST: ${err}`)
  }
}

newsStandSchema.statics.fetchNewsContainers = async (data) => {
  const forAccount = data.user ? { user: data.user } : { user: 'default'};
  let docs, containers;
  try {
    docs = await NewsStand.find(forAccount); 
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

newsStandSchema.statics.deleteNewsContainer = async (id, email) => {
  let docs, currentState;
  try {
    docs = await NewsStand.findOne({ user: email }); 
  } catch (err) {
    console.error(`ERROR FINDING SOURCES DURING DELETE: ${err}`)
    return [];
  }

  currentState = docs;
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

newsStandSchema.statics.rearrangeContainer = async (id, direction, email) => {
  let docs, currentState;
  try {
    docs = await NewsStand.findOne({ user: email }); 
  } catch (err) {
    console.error(`ERROR FINDING SOURCES DURING DELETE: ${err}`)
    return [];
  }
  
  currentState = docs;
  const { left, right } = direction;
  if(left) {
    if(id === 0) {
      return [];
    }

    if(currentState.newsContainers[id]) {
      currentState.newsContainers = [
        ...currentState.newsContainers.slice(0, id - 1),
        ...currentState.newsContainers.slice(id, id + 1),
        ...currentState.newsContainers.slice(id - 1, id),
        ...currentState.newsContainers.slice(id + 1)
      ]
    }

  } else if(right) {
    if(id === currentState.newsContainers.length - 1) {
      return [];
    }
    currentState.newsContainers = [
      ...currentState.newsContainers.slice(0, id),
      ...currentState.newsContainers.slice(id + 1, id + 2),
      ...currentState.newsContainers.slice(id, id + 1),
      ...currentState.newsContainers.slice(id + 2)
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
