const model = require('../models');

module.exports.getReviewsForProduct = async function getReviewsForProduct(req, res) {
  console.log(req.query);
  try {
    const reviews = await model.findAllReviews(req.query);
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
  }
};
