const model = require('../models');

module.exports.getProductReviews = async function getReviewsForProduct(req, res) {
  try {
    const reviews = await model.findReviews(req.query);
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getProductReviewsMeta = async function getProductReviewsMeta(req, res) {
  console.log(req);
  res.json(req);

}

module.exports.putHelpfulReview = async function putHelpfulReview(req, res) {
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

module.exports.putReportReview = async function putHelpfulReview(req, res) {
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

module.exports.postReview = async function postReview(req, res) {
  try {
    const newReview = await model.add(req.body);
    if (newReview.rowCount === Object.keys(req.body.characteristics).length) {
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
