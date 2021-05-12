var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'docvip1000',
  port: 5432,
})

router.get('/getData', function (req, res, next) {
  pool.query('SELECT * FROM product_info', (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  })
  // pool.end();
});

router.get('/addData', function (req, res, next) {
  res.render('addData', {});
});

router.post('/addData', function (req, res, next) {
  var product_name = req.body.product_name,
    product_price = req.body.product_price,
    product_image = req.body.product_image;
  pool.query("INSERT INTO product_info(product_name, product_price, product_image) VALUES($1,$2,$3)", [product_name, product_price, product_image], (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send('Đã nhận được dữ liệu ' + product_name + product_price + product_image);
    }
  })
});

module.exports = router;
