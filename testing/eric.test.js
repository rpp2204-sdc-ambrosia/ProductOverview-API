const app = require("../server/app.js");
const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).to.equal(200);
      })
  });
});

describe("/products", () => {
  test("it should return 5 reviews total when count isnt specified", async () => {
    const response = await request(app).get("/products")

    expect(response.body.length).to.equal(5)
  });

  test("it should return results matching count parameter when specified", async () => {
    const response = await request(app).get("/products?count=10")

    expect(response.body.length).to.equal(10)
  });

  test("it should return a product object in the correct shape", async () => {
    const response = await request(app).get("/products")

    expect(response.body[0]).to.have.keys('product_id', 'name', 'slogan', 'description', 'category', 'default_price')
  });

});

describe("/products/:product_id", () => {

  test("It should return product level information for a specified product in the correct shape", async () => {
    const response = await request(app).get("/products/1")

    expect(response.body).to.have.keys('product_id', 'name', 'slogan', 'description', 'category', 'default_price','features')
  });

  test("It should included joined feature table data in correct shape", async () => {
    const response = await request(app).get("/products/1")

    expect(response.body.features[0]).to.have.keys('name', 'value')
  });

});

describe("/products/:product_id/styles", () => {
  test("it should return product style in correct shape", async () => {

    const response = await request(app).get("/products/1/styles")

    expect(response.body).to.have.keys('product_id', 'results')
  }, 60000);

  test("returned product style object should also contain array of objects within results property in the correct shape", async () => {

    const response = await request(app).get("/products/1/styles")

    expect(response.body.results[0]).to.have.keys('product_style_id', 'name', 'original_price', 'sale_price', 'default', 'photos', 'skus')
  },60000);

  test("returned product style object should also contain nested objects within photos property of the correct shape", async () => {

    const response = await request(app).get("/products/1/styles")

    expect(response.body.results[0].photos[0]).to.have.keys('thumbnail_url', 'url')
  },60000);

  test("returned product style object should also contain nested objects within skus property of the correct shape", async () => {

    const response = await request(app).get("/products/1/styles")

    expect(response.body.results[0].skus[0]).to.have.keys('quantity', 'size')
  },60000);

});

describe("/products/:product_id/related", () => {
  test("it should an array of related product_ids", async () => {
    const response = await request(app).get("/products/1/related")

    expect(response.body).to.be.an('array')
    expect(response.body.length).to.be.above(0)
  });

  test("returned array should contain integer values", async () => {
    const response = await request(app).get("/products/1/related")

    expect(response.body[0]).to.be.a('number')
  });

  // test("it should handle case where no related product_ids are present", async () => {
  //   const response = await request(app).get("/products/1/related")

  //   expect(response.body.length).to.equal(5)
  // });

});