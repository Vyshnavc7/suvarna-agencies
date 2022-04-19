var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');
const productHelpers = require('../helpers/product-helpers');
const { response } = require('express');

/* GET home page. */
router.get('/', function (req, res, next) {
  productHelpers.listProducts().then((products) => {
    productHelpers.viewCategory().then((categorys)=>{

      res.render('user/index', { admin: false, products, categorys });
    
    })
  })

});

router.get('/about', function (req, res, next) {
  userHelpers.viewStaff().then((staff)=>{
    res.render('user/about',{admin:false,staff});
  })
});


router.get('/signup', function (req, res, next) {
  res.render('user/signup');
});

// router.post('/signup',(req,res)=>{
//   userHelpers.addUser(req.body).then((response)=>{
//       res.render("user/signup")
//       console.log(response);
//   })
// })


router.get('/contact', function (req, res, next) {
  res.render('user/contact', { admin: false });
});

router.post('/contact', function (req, res, next) {

  userHelpers.contactSub(req.body,(result)=>{
    res.render('/contact',{admin:false});
  })
});


router.post('/signup', (req, res) => {
  userHelpers.addUser(req.body, (result) => {
      res.render("user/index", { admin: false })
  })
})

router.post('/userLogin', (req, res) => {
  userHelpers.doLogin(req.body)
})




module.exports = router;
