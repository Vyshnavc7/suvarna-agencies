var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/all-products',{admin:true});
});  
router.get('/add-category', function(req, res, next) {
  res.render('admin/add-category',{admin:true});
}); 
module.exports = router;
