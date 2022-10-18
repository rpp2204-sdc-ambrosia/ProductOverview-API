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

// describe("/products", () => {
//   test("it should return 5 reviews total when count isnt specified", async () => {
//     const response = await request(app).get("/products")

//     expect(response.body.length).to.equal(5)
//   });

//   test("it should return results matching count parameter when specified", async () => {
//     const response = await request(app).get("/products?count=10")

//     expect(response.body.length).to.equal(10)
//   });

// });