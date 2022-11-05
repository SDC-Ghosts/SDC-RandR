const model = require('../models');

module.exports.getProductReviews = async function getReviewsForProduct(req, res) {
  try {
    const reviews = await model.findReviews(req.query);
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getProductReviewsMeta = async function (req, res) {
  console.log(req);
  res.json(req);

}

module.exports.putHelpfulReview = async function (req, res) {
  try {
    const helpful = await model.markHelpful(req.params.review_id);
    if (helpful.rowCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.putReportReview = async function (req, res) {
  try {
    const report = await model.report(req.params.review_id);
    if (report.rowCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.postReview = async function (req, res) {

};

