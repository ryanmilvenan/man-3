import mongoose from 'mongoose';
import { newsContainerSchema } from './NewsContainerSchema.js'
const Schema = mongoose.Schema;

const newsStandSchema = new Schema({
  newsContainers: [newsContainerSchema]
});

newsStandSchema.statics.refreshSources = async (data) => {
  let docs, newsStand;
  try {
    docs = await NewsStand.find({}); 
  } catch (err) {
    console.error(`ERROR FINDING SOURCES: ${err}`) 
  }

  if(!docs.length) {
    newsStand = new NewsStand(data);
  } else {
    let currentState = docs[0];
    currentState.newsContainers = data.newsContainers;
    newsStand = currentState;
  }

  return await newsStand.save();
}

//let NewsStand;
//if(!mongoose.models.NewsStand) {
//  NewsStand = mongoose.model("NewsStand", newsStandSchema);
//} else {
//  NewsStand = mongoose.model("NewsStand");
//}

const NewsStand = mongoose.model("NewsStand", newsStandSchema);

export default NewsStand;
