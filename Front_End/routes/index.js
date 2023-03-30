var express = require('express');
var sign_up_model = require('../model/sign_up');
var payment_model = require('../model/payment-detail');
var router = express.Router();
const storage = require('node-persist');

/* GET home page. */
router.get('/',async function(req, res, next) {
  await storage.init();
  var data = await storage.getItem('find');
  res.render('index', {data});
});

// ********************************************* # Start Sign up Page # *****
router.get('/sign_up',async function(req, res, next) {
  await storage.init();
  var data = await storage.getItem('find');

  res.render('sign_up', {data});
});

router.post('/sign_up',async function(req, res, next) {

  var obj = {
    user_email:req.body.user_email,
    user_pass:req.body.user_pass,
    user_confpass:req.body.user_confpass
  }
  await sign_up_model.create(obj);

  res.redirect('sign_in');

});

// ********************************************* # End Sign up Page # *****

// ********************************************* # Start Sign in Page # *****
router.get('/sign_in',async function(req, res, next) {
  await storage.init();
  var data = await storage.getItem('find');

  res.render('sign_in', {data});
});

router.post('/sign_in',async function(req, res, next) {

  await storage.init();
  
  var email = req.body.user_email;
  var password = req.body.user_pass;

  var find = await sign_up_model.find({user_email:email});

  if(find!='')
  {
    if(find[0].user_pass == password)    
    {
      await storage.setItem('find',find)
      res.redirect('/');
    }
    else
    {
      res.send('Please Check Your Password');
    }
  }
  else
  {
    res.send('please check email id');
  }
});

// ********************************************* # End Sign in Page # *****

// ********************************************* # Start Logout Page # *****

router.post('/logout',async function(req, res, next) {
  await storage.init();
  await storage.clear();

  res.redirect('/');
});

// ********************************************* # End Logout Page # *****

// ********************************************* # Start movie_details Page # *****

router.get('/movie_details',async function(req, res, next) {
  await storage.init();
  var data = await storage.getItem('find');

  res.render('movie_details', {data});
});

// ********************************************* # End movie_details Page # *****

// ********************************************* # start movie_seat_plan Page # *****

router.get('/movie_seat_plan',async function(req, res, next) {
  await storage.init();
  var data = await storage.getItem('find');

  res.render('movie_seat_plan', {data});
});

router.post('/movie_seat_plan',async function(req, res, next) { 

  await storage.init();
  var obj = {
    sheet_no : req.body.sheet_no,
    total_price : req.body.total_price,
    book_date : req.body.book_date,
    movie_time : req.body.movie_time
  }

  if(typeof obj.sheet_no === 'undefined')
  {
    res.send('book your sheet');
  }
  else
  {
    var sheet = obj.sheet_no;
    var total = obj.total_price;
    var date = obj.book_date;
    var time = obj.movie_time;

    var data1 = await storage.setItem('sheet',sheet);
    var data2 = await storage.setItem('total',total);
    var data3 = await storage.setItem('date',date);
    var data4 = await storage.setItem('time',time);

    res.redirect('movie_checkout');
  }
  
});

// ********************************************* # End movie_seat_plan Page # *****


// ********************************************* # Start movie_details Page # *****

router.get('/movie_checkout',async function(req, res, next) {
  await storage.init();
  var data = await storage.getItem('find');

  var user = data[0].user_email;

    var data1 = await storage.getItem('sheet');
    var data2 = await storage.getItem('total');
    var data3 = await storage.getItem('date');
    var data4 = await storage.getItem('time');v   

  res.render('movie_checkout', {data,data1,data2,data3,data4,user});
});

// ********************************************* # End movie_details Page # *****

module.exports = router;
