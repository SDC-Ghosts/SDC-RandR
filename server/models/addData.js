const postgresDB = require('../../db/postgres.js');

module.exports.addReview = async function({
  product_id,
  rating,
  summary,
  body,
  recommend,
  name,
  email,
  photos,
  characteristics,
}) {
  try {
    const newReview = await postgresDB.query("WITH newReview as (INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) values ($1, $2, $3, $4, $5, $6, $7) RETURNING id), newPhotos as (INSERT INTO  reviews_photos(review_id, url) SELECT (SELECT id FROM newReview), UNNEST (string_to_array($8, ','))) INSERT INTO characteristic_reviews(review_id, characteristic_id, value) SELECT (SELECT id FROM newReview), (key::int), value::text::int FROM json_each($9);", [product_id, rating, summary, body, recommend, name, email, photos.toString(), characteristics]);
    return newReview;
  } catch (err) {
    console.log(err);
    return err;
  }
};
