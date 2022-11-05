const postgresDB = require('../../db/postgres.js');

module.exports.findAllReviews = async function findAllReviews({
  product_id,
  sort,
  page,
  count,
}) {
  try {
    console.log(sort);
    let order = 'helpfulness DESC, date DESC';
    if (sort === 'newest') {
      order = 'date DESC';
    } else if (sort === 'helpful') {
      order = 'helpfulness';
    }
    console.log(order)
    const reviews = await postgresDB.query("SELECT r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, CASE WHEN SUM(p.id) IS NULL THEN '[]' ELSE  json_agg(json_build_object('id', p.id, 'url', p.url)) END AS photos FROM reviews as r LEFT JOIN reviews_photos as p ON r.id = p.review_id WHERE product_id = $1 GROUP BY r.id ORDER BY DATE DESC;", [product_id]);
    return reviews.rows;
  } catch (err) {
    console.log(err);
    return err;
  }
};
