const model = require('../models');

module.exports.getReviewsForProduct = async function getReviewsForProduct(req, res) {
  const productId = req.params.product_id;
  try {
    const allReviews = await model.findAllReviews(productId);
    res.status(200).json(allReviews);
  } catch (err) {
    console.log(err);
    return err;
  }
}