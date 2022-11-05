const router = require('express').Router();
const controllers = require('./controllers');

router.get('/reviews', controllers.getProductReviews);
router.get('/reviews/meta', controllers.getProductReviewsMeta);
router.put('/reviews/:review_id/helpful', controllers.putHelpfulReview);
router.put('/reviews/:review_id/report', controllers.putReportReview);
router.post('/reviews', controllers.postReview);

module.exports = router;
