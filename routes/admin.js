var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard',{admin:true});
});  
router.get('/add-category', function(req, res, next) {
  res.render('admin/add-category',{admin:true});
}); 
router.get('/add-product', function(req, res, next) {
  res.render('admin/add-product',{admin:true});
}); 
router.get('/view-edit-user', function(req, res, next) {
  res.render('admin/view-edit-user',{admin:true});
}); 
router.get('/dashboard', function(req, res, next) {
  res.render('admin/dashboard',{admin:true});
}); 
router.get('/all-products', function(req, res, next) {
  res.render('admin/all-products',{admin:true});
}); 
router.get('/add-category', function(req, res, next) {
  res.render('admin/add-category',{admin:true});
}); 
router.get('/view-category', function(req, res, next) {
  res.render('admin/view-category',{admin:true});
}); 


module.exports = router;
