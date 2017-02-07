import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
if(!mongoose.connection.readyState) {
  mongoose.connect('mongodb://localhost/mangrove');
}
const connection = mongoose.connection;
const Schema = mongoose.Schema;

const newsItemSchema = new Schema({
  link: String,
  title: String,
  contentSnippet: String,
  publishedDate: String,
  content: String,
  img: String,
  itemId: Number,
  containerId: Number,
  expanded: Boolean
});

const newsContainerSchema = new Schema({
  id: Number,
  url: String,
  maxHeadlines: Number,
  timeout: Number,
  items: [newsItemSchema],
  loading: Boolean
});

const newsStandSchema = new Schema({
  newsContainers: [newsContainerSchema]
});

let NewsStand;
if(!mongoose.models.NewsStand) {
  NewsStand = mongoose.model("NewsStand", newsStandSchema);
} else {
  NewsStand = mongoose.model("NewsStand");
}

export default {
  connection,
  NewsStand,
  mongoose
}
