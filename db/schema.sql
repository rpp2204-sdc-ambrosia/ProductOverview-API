
CREATE TABLE product(
  product_id SERIAL UNIQUE PRIMARY KEY,
  name VARCHAR NOT NULL,
  slogan VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  default_price INT NOT NULL
)

-- -- this table will be joined when querying instead
-- CREATE TABLE product_feature(
--   product_feature_id SERIAL UNIQUE PRIMARY KEY,
--   product_id INT REFERENCES product(product_id),
--   feature_id INT REFERENCES features(features_id)
-- )

CREATE TABLE features(
  features_id SERIAL UNIQUE PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR NOT NULL,
  value VARCHAR NOT NULL
)

CREATE TABLE product_style(
  product_style_id SERIAL UNIQUE PRIMARY KEY,
  product_id INT REFERENCES product(product_id),
  name VARCHAR NOT NULL,
  sale_price TEXT,
  original_price INT NOT NULL,
  "default" BOOLEAN NOT NULL
)

CREATE TABLE sku(
  sku_id SERIAL UNIQUE PRIMARY KEY,
  product_style_id INT REFERENCES product_style(product_style_id),
  size VARCHAR NOT NULL,
  quantity INT NOT NULL
)

CREATE TABLE photo(
  photo_id SERIAL UNIQUE PRIMARY KEY,
  product_style_id INT REFERENCES product_style(product_style_id),
  thumbnail_url VARCHAR NOT NULL,
  url VARCHAR NOT NULL
)

-- This table will be joined when querying
CREATE TABLE related(
  related_id SERIAL UNIQUE PRIMARY KEY,
  current_product_id INT REFERENCES product(product_id),
  related_product_id INT REFERENCES product(product_id)
)