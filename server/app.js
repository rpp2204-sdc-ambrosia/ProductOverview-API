const express = require("express");
const router = require("../server/server.js");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router)

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(3000, () => {
  console.log("listening on port 3000!");
});

module.exports = app;