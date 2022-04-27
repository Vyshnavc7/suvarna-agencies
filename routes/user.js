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

  userHelpers.contactSub(req.body, (result) => {
    res.render('user/contact', { admin: false })

  })
});


router.post('/signup', (req, res) => {

  var db = require('../config/connection')
  var collection = require('../config/collections');
  var username = req.body.name
  return new Promise(async(resolve,reject)=>{
    var username1 = await db.get().collection(collection.USER_COLLECTION).find({},{name:username,_id:0}).toArray
    resolve(username1)
    console.log(username1);
    if (username != username1) {
      userHelpers.addUser(req.body, (result) => {
        console.log('User',username1);
        res.render("user/index", { admin: false ,result})
      })
    }else{
      console.log('Already exist');
  
    }
    })

    // userHelpers.addUser(req.body).then((response)=>{
    //   console.log(response);
    // })
  })
  


  


router.post('/userLogin', (req, res) => {
  userHelpers.doLogin(req.body)
})




module.exports = router;
