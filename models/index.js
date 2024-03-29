
const mongoose = require('mongoose');
// Database Address & Name
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/event';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log(`MongoDB connected successfully at ${MONGODB_URI}`)) // Success Handler
  .catch((err) => console.log(`MongoDB connection error: ${err}`)) // Error Handler


// MAKE ALL MODELS AVAILABLE
module.exports = {
  Event: require('./Event'),
};