const selectData = require('./selectData.js');
const updateData = require('./updateData.js');
const addData = require('./addData.js');

module.exports = {
  findReviews: selectData.findProductReviews,
  findReviewsMeta: selectData.findProductReviewsMeta,
  markHelpful: updateData.markReviewHelpful,
  report: updateData.reportReview,
  add: addData.addReview,
};
