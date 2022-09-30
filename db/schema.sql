DROP DATABASE ProductOverview;
CREATE DATABASE ProductOverview;

CREATE TABLE product(
  product_id PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  slogan VARCHAR(1000) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  default_price INT NOT NULL,
  category VARCHAR(250) NOT NULL
)

-- -- intended to be join table
CREATE TABLE product_feature(
  product_feature_id PRIMARY KEY,
  CONSTRAINT product_id FOREIGN KEY(product_id)
  REFERENCES product(product_id),
  feature_id INT NOT NULL
)

CREATE TABLE features(
  CONSTRAINT feature_id FOREIGN KEY(feature_id)
  REFERENCES product_feature(feature_id),
  name VARCHAR(250) NOT NULL,
  value VARCHAR(250) NOT NULL
)

CREATE TABLE product_style(
  product_style_id PRIMARY KEY,
  CONSTRAINT product_id FOREIGN KEY(product_id)
  REFERENCES product(product_id),
  name VARCHAR(250) NOT NULL,
  original_price INT NOT NULL,
  sale_price INT NOT NULL,
  default BOOLEAN NOT NULL
)

CREATE TABLE sku(
  sku_id PRIMARY KEY,
  CONSTRAINT style_id FOREIGN KEY(product_style_id)
  REFERENCES product_style(product_style_id),
  quantity INT NOT NULL,
  size VARCHAR(15) NOT NULL

)

CREATE TABLE photo(
  photo_id PRIMARY KEY,
  CONSTRAINT style_id FOREIGN KEY(style_id)
  REFERENCES style(style_id),
  thumbnail_url VARCHAR(500) NOT NULL,
  url VARCHAR(500) NOT NULL
)

CREATE TABLE related(
  related_id PRIMARY KEY,
  CONSTRAINT related_product_id FOREIGN KEY(product_id)
  REFERENCES product(product_id),
  CONSTRAINT product_id FOREIGN KEY(product_id)
  REFERENCES product(product_id)
)