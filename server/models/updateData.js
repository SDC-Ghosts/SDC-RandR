const postgresDB = require('../../db/postgres.js');

module.exports.markReviewHelpful = async function markReviewHelpful(reviewId) {
  try {
    const helpful = await postgresDB.query('UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1', [reviewId]);
    return helpful;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.reportReview = async function reportReview(reviewId) {
  try {
    const report = await postgresDB.query('UPDATE reviews SET reported = TRUE WHERE id = $1;', [reviewId]);
    return report;
  } catch (err) {
    console.log(err);
    return err;
  }
};
