const request = require("supertest");
const app = require("../server/app.js");

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("/products", () => {
  // test("it should return 5 reviews total when count isnt specified", () => {
  //   return request(app)
  //     .get("/products")
  //     .then(response => {
  //       console.log('response: ', response.body)
  //       // expect(response.statusCode).toBe(200);
  //     });
  // });

  test("GET /api/posts/:id", async () => {

    await supertest(app)
      .get("/products")
      .expect(200)
      .then((response) => {
        console.log('inner response: ', response);
        // expect(response.body._id).toBe(post.id)
        // expect(response.body.title).toBe(post.title)
        // expect(response.body.content).toBe(post.content)
      })
  })

});