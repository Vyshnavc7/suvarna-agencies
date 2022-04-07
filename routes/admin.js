const { response } = require('express');
var express = require('express');
const async = require('hbs/lib/async');
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();

// to call addproduct function, then require this module here

/* GET users listing. */
router.get('/', function (req, res, next) {
  productHelpers.getCategoryCount().then((categorycount) => {
    productHelpers.getProductCount().then((productcount) => {
      productHelpers.getUserCount().then((usercount) => {

        res.render('admin/dashboard', { admin: true, productcount, categorycount, usercount });
      })

    })
  })

});
// rending or traversing to another page of admin
router.get('/add-category', function (req, res, next) {
  res.render('admin/add-category', { admin: true });
});
router.get('/add-product', function (req, res, next) {
  productHelpers.viewCategory().then((categorys) => {
    console.log("List of category ", categorys);
    res.render('admin/add-product', { admin: true, categorys });
  })

});
router.get('/view-edit-user', function (req, res, next) {
  userHelpers.listUser().then((users) => {
    res.render('admin/view-edit-user', { admin: true, users });

  })
});


router.get('/dashboard', function (req, res, next) {
  productHelpers.getCategoryCount().then((categorycount) => {
    productHelpers.getProductCount().then((productcount) => {
      productHelpers.getUserCount().then((usercount) => {

        res.render('admin/dashboard', { admin: true, productcount, categorycount, usercount });
      })

    })
  })

});


router.get('/all-products', function (req, res, next) {
  // used for list product and calling
  productHelpers.listProducts().then((products) => {
    res.render('admin/all-products', { admin: true, products });
  })

});
router.get('/view-category', function (req, res, next) {
  productHelpers.viewCategory().then((categorys) => {
    res.render('admin/view-category', { admin: true, categorys });

  })
});

// adding and calling addproduct function in database
router.post('/add-product', (req, res) => {

  // listing form data in server
  // console.log(req.body);
  // console.log(req.files.image);

  // calling addproduct function from producthelpers to insert to database
  productHelpers.addProduct(req.body, (id) => {
    let image = req.files.image
    let name = req.files.image.name
    let id1 = req.body._id

    image.mv('./public/product-images/' + id1 + '.jpg', (err, done) => {
      if (!err) {
        console.log('Image inserted');
        console.log('image id in folder is :' + id1);
        res.render("admin/add-product", { admin: true })
      } else {
        console.log(err);
      }
    })
  })


});

// calling add catergory from product helpers to insert data
router.post('/add-category', (req, res) => {
  
  productHelpers.addCategory(req.body,  (result) => {
   
    res.render("admin/add-category", { admin: true })
  })
})


// for product edit delete 

router.get('/delete-product/:id',(req,res)=>{
  let productID = req.params.id
  // console.log(productID);
  productHelpers.deleteProduct(productID).then((response)=>{
    res.redirect('/admin/all-products/')
  })
})

router.get('/edit-product/:id',async (req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{admin:true ,product})
})

router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id)
  let id1 = req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin/all-products')
    if(req.files.image){
      let image=req.files.image
      
      image.mv('./public/product-images/' + id1 + '.jpg')
    }
  })
})

// for category edit and delete

router.get('/delete-category/:id',(req,res)=>{
  let categoryID = req.params.id
  // console.log(productID);
  productHelpers.deleteCategory(categoryID).then((response)=>{
    res.redirect('/admin/view-category/')
  })
})

router.get('/edit-category/:id',async (req,res)=>{
  let category=await productHelpers.getCategoryDetails(req.params.id)
  console.log(category);
  res.render('admin/edit-category',{admin:true ,category})
})

router.post('/edit-category/:id',(req,res)=>{
  
  productHelpers.updateCategory(req.params.id,req.body).then(()=>{
    res.redirect('/admin/view-category')
    
  })
})

// for user
router.get('/delete-user/:id',(req,res)=>{
  let userID = req.params.id
  // console.log(productID);
  userHelpers.deleteUser(userID).then((response)=>{
    res.redirect('/admin/view-edit-user/')
  })
})

// for staff add
router.get('/add-staff', function (req, res, next) {
    res.render('admin/add-staff', { admin: true });
});

router.post('/add-staff', (req, res) => {

  // listing form data in server
  // console.log(req.body);
  // console.log(req.files.image);

  // calling addstaff function from userhelpers to insert to database
  userHelpers.addStaff(req.body, (id) => {
    let image = req.files.image
    let name = req.files.image.name
    let id1 = req.body._id

    image.mv('./public/staff-images/' + id1 + '.jpg', (err, done) => {
      if (!err) {
        console.log('Image inserted');
        console.log('image id in folder is :' + id1);
        res.render("admin/add-staff", { admin: true })
      } else {
        console.log(err);
      }
    })
  })


});
// for staff view
router.get('/view-staff', function (req, res, next) {
  // used for list product and calling
  userHelpers.viewStaff().then((staff) => {
    res.render('admin/view-staff', { admin: true, staff });
  })

});

// for staff edit and delete

router.get('/delete-staff/:id',(req,res)=>{
  let staffID = req.params.id
  // console.log(productID);
  userHelpers.deleteStaff(staffID).then((response)=>{
    res.redirect('/admin/view-staff/')
  })
})

router.get('/edit-category/:id',async (req,res)=>{
  let category=await productHelpers.getCategoryDetails(req.params.id)
  console.log(category);
  res.render('admin/edit-category',{admin:true ,category})
})

router.post('/edit-category/:id',(req,res)=>{
  
  productHelpers.updateCategory(req.params.id,req.body).then(()=>{
    res.redirect('/admin/view-category')
    
  })
})



module.exports = router;
