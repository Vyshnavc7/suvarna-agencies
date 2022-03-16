var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
// to call addproduct function, then require this module here
var product=require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard',{admin:true});
});  
// rending or traversing to another page of admin
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
  // used for list product and calling
  productHelpers.listProducts().then((products)=>{
    res.render('admin/all-products',{admin:true,products});
  })
 
}); 
router.get('/view-category', function(req, res, next) {
  productHelpers.viewCategory().then((categorys)=>{
    res.render('admin/view-category',{admin:true,categorys});
    
  })
}); 

// adding and calling addproduct function in database
router.post('/add-product',(req,res)=>{

  // listing form data in server
  // console.log(req.body);
  // console.log(req.files.image);
  
  // calling addproduct function from producthelpers to insert to database
  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.image
    let name=req.files.image.name
    let id1=req.body._id
    
    image.mv('./public/product-images/'+id1+'.jpg',(err,done)=>{
      if(!err){
        console.log('Image inserted');
        console.log('image id in folder is :'+id1);
        res.render("admin/add-product",{admin:true})
      }else{
        console.log(err);
      }
    })
  })
  
  
});

// calling add catergory from product helpers to insert data
router.post('/add-category',(req,res)=>{
  productHelpers.addCategory(req.body,(result)=>{
      res.render("admin/add-category",{admin:true})
  })
})

router.get('/dashboard',async(req,res)=>{
  // let admin=req.session.admin
  // let sellercount=await adminHelpers.getSellersCount()
  // let usercount=await adminHelpers.getUserCount()
  // let bookingcount=await adminHelpers.getBookingsCount()
  // let vehiclescount=await adminHelpers.getVehiclesCount()
  let productcount=await productHelpers.getProductCount()
  let categorycount=await productHelpers.getCategoryCount()
  // res.render('admin/dashboard',{admin,sellercount,usercount,bookingcount,vehiclescount})
  res.render('admin/dashboard',{productcount,categorycount})
}),

router.get('/dashboard', function(req,res, next) {
  // used for list product and calling
  productHelpers.getCategoryCount().then((count1)=>{
    res.render('admin/dashboard',{admin:true,count1});
  })
}); 





module.exports = router;
