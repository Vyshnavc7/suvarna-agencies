var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');
const productHelpers = require('../helpers/product-helpers');
const { response } = require('express');

/* GET home page. */
router.get('/', function (req, res, next) {
  productHelpers.listProducts().then((products) => {
    productHelpers.viewCategory().then((categorys) => {

      res.render('user/index', { admin: false, products, categorys });

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
  var db = require('../config/connection')
  var collection = require('../config/collections');
  let email1=req.body.mail
  console.log(req.body,'uuuuuuuuuuuuu');
  return new Promise(async (resolve, reject) => {
    
    let loginStatus = false
    let response = {}
    var user = await db.get().collection(collection.USER_COLLECTION).find({ email: email1 }).toArray()
    let pass = req.body.pass
    console.log(pass,'kkkkkkkkkkkkkkkkkkk');
    console.log(user,'ppppppppppppppppp');
    if (user[0]) {
        if (pass == user[0].pass) {
          productHelpers.listProducts().then((products) => {
            console.log('Login', user);
            res.render("user/index", { admin: false, products })
          })
        }else{
          console.log('Pass no MAtch');
        }
    }else{
      console.log('User Not exist');
    }
  })
  // userHelpers.doLogin(req.body)
})




module.exports = router;
