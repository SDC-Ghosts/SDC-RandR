const router = require('express').Router();
const controllers = require('./controllers');

router.get('/reviews', controllers.getReviewsForProduct);

module.exports = router;
