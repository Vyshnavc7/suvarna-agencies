var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
// to call addproduct function, then require this module here
var product=require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard',{admin:true});
});  
// rending or traversing to another page
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

// adding and calling addproduct function in database
router.post('/add-product',(req,res)=>{
  // listing form data in server
  console.log(req.body);
  console.log(req.files.image);
  
  // calling addproduct function from producthelpers to insert to database
  productHelpers.addProduct(req.body,(result)=>{
    let image=req.files.image
    image.mv('./public/product-images/1.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
      }else{
        console.log(err);
      }
    })
    
    
  })

});


module.exports = router;
