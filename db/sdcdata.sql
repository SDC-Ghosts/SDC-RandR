CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL NOT NULL,
  rating INT NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  summary VARCHAR(150) NOT NULL DEFAULT '',
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  product_id INT NOT NULL,
  helpfulness int DEFAULT 0,
  reported BOOLEAN DEFAULT FALSE,
  date BIGINT,
  response VARCHAR(1000) DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/home/nyall/Desktop/HackReactor/SDC-RandR/pythonwork/data/reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL NOT NULL,
  product_id INT NOT NULL,
  name varchar(20) NOT NULL,
  PRIMARY KEY (id)
);

COPY characteristics(id, product_id, name)
FROM '/home/nyall/Desktop/HackReactor/SDC-RandR/pythonwork/data/characteristics.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id SERIAL NOT NULL,
  review_id INT NOT NULL REFERENCES reviews(id),
  characteristic_id INT NOT NULL REFERENCES characteristics(id),
  value INT NOT NULL,
  PRIMARY KEY (id)
);

COPY characteristic_reviews(id, characteristic_id, review_id, value)
FROM '/home/nyall/Desktop/HackReactor/SDC-RandR/pythonwork/data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS reviews_photos(
  id SERIAL NOT NULL,
  review_id INT NOT NULL REFERENCES reviews(id),
  url VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);

COPY reviews_photos(id, review_id, url)
FROM '/home/nyall/Desktop/HackReactor/SDC-RandR/pythonwork/data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE reviews ALTER COLUMN date TYPE TIMESTAMP USING to_timestamp(date/1000);
ALTER TABLE reviews ALTER COLUMN date SET DEFAULT now();
UPDATE reviews SET response = NULL where response = 'null';
SELECT setVal('reviews_id_seq', MAX(id)) FROM reviews;
SELECT setVal('characteristics_id_seq', MAX(id)) FROM characteristics;
SELECT setVal('characteristic_review_id_seq', MAX(id)) FROM characteristic_review;
SELECT setVal('reviews_photos_id_seq', MAX(id)) FROM reviews_photos;