CREATE TABLE IF NOT EXISTS reviews (
  id INT NOT NULL,
  rating INT NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  summary VARCHAR(150),
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  product_id INT NOT NULL,
  helpfulness int DEFAULT 0,
  reported BOOLEAN DEFAULT FALSE,
  date BIGINT DEFAULT EXTRACT(epoch FROM now()) * 1000,
  response VARCHAR(1000),
  PRIMARY KEY (id)
  );

COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/home/nyall/Desktop/HackReactor/SDC-RandR/pythonwork/data/reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS characteristics (
  id INT NOT NULL,
  product_id INT NOT NULL,
  name varchar(20) NOT NULL,
  PRIMARY KEY (id)
  );

COPY characteristics(id, product_id, name)
FROM '/home/nyall/Desktop/HackReactor/SDC-RandR/pythonwork/data/characteristics.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id INT NOT NULL,
  review_id INT NOT NULL REFERENCES reviews(id),
  characteristic_id INT NOT NULL REFERENCES characteristics(id),
  value INT NOT NULL,
  PRIMARY KEY (id)
  );

  COPY characteristic_reviews(id, characteristic_id, review_id, value)
  FROM '/home/nyall/Desktop/HackReactor/SDC-RandR/pythonwork/data/characteristic_reviews.csv'
  DELIMiTER ','
  CSV HEADER;

CEATE TABLE IF NOT EXISTS reviews_photos(
  id INT NOT NULL,
  review_id INT NOT NULL REFERENCES reviews(id),
  url VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
  );

COPY reviews_photos(id, review_id, url)
FROM '/home/nyall/Desktop/HackReactor/SDC-RandR/pythonwork/data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;