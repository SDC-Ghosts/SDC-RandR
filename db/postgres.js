const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});
pool.query('CREATE TABLE IF NOT EXISTS reviews (id INT NOT NULL, rating INT NOT NULL, reviewer_name VARCHAR(60) NOT NULL, reviewer_email VARCHAR(60) NOT NULL, summary VARCHAR(150), body VARCHAR(1000) NOT NULL, recommend BOOLEAN NOT NULL, product_id INT NOT NULL, helpfulness int DEFAULT 0, reported BOOLEAN DEFAULT FALSE, date BIGINT DEFAULT EXTRACT(epoch FROM now()) * 1000, response VARCHAR(1000), PRIMARY KEY (id));')
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
pool.query('CREATE TABLE IF NOT EXISTS characteristics (id INT NOT NULL, product_id INT NOT NULL, name varchar(20) NOT NULL, PRIMARY KEY (id));')
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

pool.query('CREATE TABLE IF NOT EXISTS characteristic_reviews (id INT NOT NULL, review_id INT NOT NULL REFERENCES reviews(id), characteristic_id INT NOT NULL REFERENCES characteristics(id), value INT NOT NULL, PRIMARY KEY (id));')
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

pool.query('CREATE TABLE IF NOT EXISTS reviews_photos(id INT NOT NULL, review_id INT NOT NULL REFERENCES reviews(id), url VARCHAR(150) NOT NULL, PRIMARY KEY (id));')
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
