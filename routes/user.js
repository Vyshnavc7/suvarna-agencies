var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');
const productHelpers = require('../helpers/product-helpers');
const { response } = require('express');

/* GET home page. */
router.get('/', function (req, res, next) {
  productHelpers.listProducts().then((products) => {
    productHelpers.viewCategory().then((categorys) => {

      res.render('user/index', { admin: false, products, categorys, response });

    })
  })

});

router.get('/about', function (req, res, next) {
  userHelpers.viewStaff().then((staff) => {
    productHelpers.viewCategory().then((categorys) => {

      res.render('user/about', { admin: false, staff, categorys });
    })
  })
});


router.get('/signup', function (req, res, next) {
  res.render('user/signup');
});


router.get('/contact', function (req, res, next) {


  res.render('user/contact', { admin: false });


});

router.post('/contact', function (req, res, next) {

  userHelpers.contactSub(req.body, (result) => {
    res.render('user/contact', { admin: false })

  })
});

// sign up condition 
router.post('/signup', (req, res) => {

  var db = require('../config/connection')
  var collection = require('../config/collections');
  var email2 = req.body.email
  return new Promise(async (resolve, reject) => {
    var email1 = await db.get().collection(collection.USER_COLLECTION).find({ email: email2 }).toArray()
    console.log(email1);
    if (email1[0]) {
      console.log('Already exist');
      res.render("user/signup", { admin: false, products })

    } else {
      userHelpers.addUser(req.body, (result) => {
        productHelpers.listProducts().then((products) => {
          console.log('User', email1);
          res.render("user/index", { admin: false, result, products })
        })
      })

    }
  })

})


router.post('/login', (req, res) => {

  req.session.loggedIn = true
  req.session.user = response.user

  userHelpers.doLogin(req.body).then((data) => {

    if (data.response.status) {
      res.render("user/index", { admin: false, products: data.products, response: data.response.user[0] })
    } else {
      res.redirect('/')
    }

  })
})




module.exports = router;
