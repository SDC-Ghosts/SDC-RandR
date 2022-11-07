const postgresDB = require('../../db/postgres.js');

module.exports.findProductReviews = async function findAllReviews({
  product_id,
  sort = 'relevant',
  page = 1,
  count = 5,
}) {
  try {
    let reviews;
    const offset = (page - 1) * count;
    if (sort === 'relevant') {
      reviews = await postgresDB.query("SELECT r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, CASE WHEN SUM(p.id) IS NULL THEN '[]' ELSE  json_agg(json_build_object('id', p.id, 'url', p.url)) END AS photos FROM reviews as r LEFT JOIN reviews_photos as p ON r.id = p.review_id WHERE product_id = $1 AND REPORTED = FALSE GROUP BY r.id ORDER BY helpfulness DESC, date DESC LIMIT $2 OFFSET $3;", [product_id, count, offset]);
    } else if (sort === 'newest') {
      reviews = await postgresDB.query("SELECT r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, CASE WHEN SUM(p.id) IS NULL THEN '[]' ELSE  json_agg(json_build_object('id', p.id, 'url', p.url)) END AS photos FROM reviews as r LEFT JOIN reviews_photos as p ON r.id = p.review_id WHERE product_id = $1 AND REPORTED = FALSE GROUP BY r.id ORDER BY date DESC LIMIT $2 OFFSET $3;", [product_id, count, offset]);
    } else if (sort === 'helpful') {
      reviews = await postgresDB.query("SELECT r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, CASE WHEN SUM(p.id) IS NULL THEN '[]' ELSE  json_agg(json_build_object('id', p.id, 'url', p.url)) END AS photos FROM reviews as r LEFT JOIN reviews_photos as p ON r.id = p.review_id WHERE product_id = $1 AND REPORTED = FALSE GROUP BY r.id ORDER BY helpfulness DESC LIMIT $2 OFFSET $3;", [product_id, count, offset]);
    }
    return {
      product: product_id.toString(),
      page: offset,
      count: Number(count),
      results: reviews.rows,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.findProductReviewsMeta = async function findProductReviewsMeta() {
  try {
    reviewsMeta = postgresDB.query('', []);
  } catch (err) {
    console.log(err);
    return err;
  }
};
