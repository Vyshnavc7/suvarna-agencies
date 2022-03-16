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
module.exports = router;
