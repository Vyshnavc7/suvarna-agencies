var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');

const { response } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index');
});

router.get('/about', function(req, res, next) {
  res.render('user/about');
}); 

router.get('/contact', function(req, res, next) {
  res.render('user/contact');
}); 

router.get('/signup', function(req, res, next) {
  res.render('user/signup');
}); 

// router.post('/signup',(req,res)=>{
//   userHelpers.addUser(req.body).then((response)=>{
//       res.render("user/signup")
//       console.log(response);
//   })
// })

router.post('/signup',(req,res)=>{
  userHelpers.addUser(req.body,(result)=>{
      res.render("user/signup",{admin:true})
  })
})

router.post('/userLogin',(req,res)=>{
  userHelpers.doLogin(req.body)
})


module.exports = router;
