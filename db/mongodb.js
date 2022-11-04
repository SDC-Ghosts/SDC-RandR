const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/sdc');

const reviewsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  product_id: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  recommend: {
    type: Boolean,
    required: true,
  },
  helpfulness: {
    type: Number,
    required: true,
  },
  reported: {
    type: Boolean,
    default: false,
  },
  response: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
