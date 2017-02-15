import mongoose from 'mongoose';
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.Promise = global.Promise;

if(!mongoose.connection.readyState) {
  mongoose.connect('mongodb://localhost/mangrove');
}
const connection = mongoose.connection;

export default {
  connection,
  mongoose
}
