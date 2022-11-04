// loaderio-7e85e7d29e5a01f1b2a1d014c29ec27a

const express = require("express");
const router = require("../server/server.js");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router)

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/loaderio-7e85e7d29e5a01f1b2a1d014c29ec27a.txt", (req, res) => {
  // console.log('result: ', `${__dirname}/loaderio-7e85e7d29e5a01f1b2a1d014c29ec27a.txt`)
  res.sendFile(`loaderio-7e85e7d29e5a01f1b2a1d014c29ec27a.txt`);
});

app.listen(3000, () => {
  console.log("listening on port 3000!");
});

module.exports = app;