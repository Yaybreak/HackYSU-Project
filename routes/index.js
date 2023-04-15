var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});
router.get('/blank.html', function(req, res, next) {
  res.render('blank', { title: 'Express' });
  
});
router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'Express' });
  
});
router.get('/register.html', function(req, res, next) {
  res.render('register', { title: 'Express' });
  
});
router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});
module.exports = router;
