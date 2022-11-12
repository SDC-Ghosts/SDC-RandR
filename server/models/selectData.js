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

module.exports.findProductReviewsMeta = async function findProductReviewsMeta(product_id) {
  try {
    const reviewsMeta = await postgresDB.query("WITH allRatings AS (SELECT a.product_id, json_object_agg(a.rating, a.count) as ratings FROM (SELECT product_id, rating, count(rating) FROM reviews WHERE product_id = $1 GROUP BY rating, product_id) a GROUP BY a.product_id), aName AS (SELECT COUNT (CASE WHEN recommend THEN true ELSE NULL END) as true ,count(CASE WHEN NOT recommend THEN true ELSE NULL END) as false from reviews where product_id = $1), chars as (SELECT json_object_agg(b.name, b.characteristics) as characteristics from (SELECT name, json_build_object('id', chars.id, 'value', AVG(cr.value))as characteristics FROM characteristics as chars INNER JOIN  characteristic_reviews as cr ON chars.id = cr.characteristic_id WHERE product_id = $1 GROUP BY name, chars.id) b) SELECT allRatings.product_id, allRatings.ratings, row_to_json(aName) AS recommended, chars.* FROM allRatings, aName, chars;", [product_id]);
    return reviewsMeta.rows[0];
  } catch (err) {
    console.log(err);
    return err;
  }
};

