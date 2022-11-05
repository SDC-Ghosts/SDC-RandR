const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/sdc');

const ReviewsPhotosSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  reviews_id: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const CharacteristicReviewsSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  characteristic_id: {
    type: Number,
    required: true,
  },
  reviews_id: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const CharacteristicsSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  product_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const ReviewsSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
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

const Reviews = mongoose.model('Reviews', ReviewsSchema);
const Characteristics = mongoose.model('Characteristics', CharacteristicsSchema);
const CharacteristicReviews = mongoose.model('CharacteristicReviews', CharacteristicReviewsSchema);
const ReviewsPhotos = mongoose.model('ReviewsPhotos', ReviewsPhotosSchema);
