var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/all-products',{admin:true});
});  
router.get('/add-category', function(req, res, next) {
  res.render('admin/add-category',{admin:true});
}); 
router.get('/add-product', function(req, res, next) {
  res.render('admin/add-product',{admin:true});
}); 
module.exports = router;
