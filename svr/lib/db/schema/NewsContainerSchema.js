import mongoose from 'mongoose';
import { newsItemSchema } from './NewsItemSchema.js'
const Schema = mongoose.Schema;

export const newsContainerSchema = new Schema({
  url: String,
  maxHeadlines: Number,
  timeout: Number,
  items: [newsItemSchema],
  loading: Boolean
});

