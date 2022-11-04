const postgresDB = require('../../db/postgres.js');

module.exports.findAllReviews = async function findAllReviews(productId) {
  try {
    const reviews = await postgresDB.query('SELECT * FROM reviews WHERE product_id = $1', [productId]);
    return reviews;
  } catch (err) {
    return err;
  }
};
