const app = require('./app');
const { pool, query } = require('../db/index.js')
const router = require('express').Router();

router.get('/products', (req, res) => {

  const count = req.query.count;
  let res_obj;

  if (!count) {
    pool
    .query('SELECT * FROM product LIMIT 5')
    .then((data) => {
      res.send(data.rows)
    })
    .catch(err => console.log('error: ', err))
  } else {
    pool
    .query(`SELECT * FROM product LIMIT ${count}`)
    .then(data => res.send(data.rows))
    .catch(err => console.log('error: ', err))
  }

})

router.get('/products/:product_id', (req, res) => {
  const req_id = req.params.product_id;
  let res_obj;
  pool
  // .query(`SELECT * FROM product INNER JOIN features ON product.product_id = features.product_id WHERE product.product_id = '${req_id}'`)
  .query(`SELECT * FROM product WHERE id = '${req_id}'`)
  .then(data => res_obj = data.rows[0])
  .catch(err => console.log('error: ', err))

  pool
  .query(`SELECT feature,value FROM features WHERE product_id = '${req_id}'`)
  .then(data => res_obj.features = data.rows)
  .then(data => res.send(res_obj))
  .catch(err => console.log('error: ', err))

})

router.get('/products/:product_id/styles', (req, res) => {
  const req_id = req.params.product_id

  let res_obj = {
    product_id: req_id,
    results: []
  };

  pool
  .query(`SELECT style_id,name,original_price,sale_price,"default?" FROM product_style WHERE product_id = '${req_id}'`)
  .then((data) => {
    let storage = [];
    let obj_skus;
    let resultArr = data.rows.map((obj) => {
      return pool
      .query(`SELECT thumbnail_url,url FROM photo WHERE product_style_id = '${obj.style_id}'`)
      .then((data) => {
        obj.photos = data.rows
      })
      .then((data) => {
        return pool.query(`SELECT sku_id,quantity,size FROM sku WHERE product_style_id = '${obj.style_id}'`)
      })
      .then((data) => {
        obj.skus = {};
        data.rows.forEach((style) => {
          obj.skus[`${style.sku_id}`] = {quantity: style.quantity, size: style.size}
        })
        storage.push(obj);
        res_obj.results = [...storage]
        return res_obj;
      })
      // return pool
      // .query(`SELECT * FROM photo INNER JOIN sku ON photo.photo_id = sku.sku_id WHERE photo.product_style_id = ${obj.style_id}`)
      // .then((data) => {
      //   console.log('returned inner join data: ', data.rows)
      // })
      // .catch(err => console.log('error: ', err))

    })
    Promise.all(resultArr)
    .then((data) => {
      // console.log('storage after: ', res_obj)
      // console.log('obj_skus: ', obj_skus)
      res.send(res_obj)
    })
    .catch(err => console.log('error: ', err))

  })

})

router.get('/products/:product_id/related', (req, res) => {
  const req_id = req.params.product_id;

  pool
  .query(`SELECT related_product_id FROM related WHERE current_product_id = '${req_id}'`)
  .then((data) => {
    if (data.rows.length > 0) {
      let relatedNums = data.rows.map(obj => obj.related_product_id)
      res.send(relatedNums)
    } else {
      res.send([])
    }
})
  .catch(err => console.log('error: ', err));

})



module.exports = router;