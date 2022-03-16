var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
var product=require('../helpers/product-helpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index');
});

router.get('/about', function(req, res, next) {
  res.render('user/about');
}); 

router.get('/contact', function(req, res, next) {
  res.render('user/contact');
}); 

router.get('/signup', function(req, res, next) {
  res.render('user/signup');
}); 



module.exports = router;
