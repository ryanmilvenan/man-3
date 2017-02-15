import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const newsItemSchema = new Schema({
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
