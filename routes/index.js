var express = require('express');
var fs = require("fs");
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
router.post('/bob',function(req,res,next) {
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  fs.appendFile("C:/xampp/htdocs/HackYSU Project/private/userdata/data.txt",username+"\n"+password+"\n",(err)=>{
    if (err) throw err;
  });
  res.render('index');
});

router.post('/billy',function(req,res,next) {
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  let valid_username = true;
  let valid_password = true;
  fs.readFile("C:/xampp/htdocs/HackYSU Project/private/userdata/data.txt",(err,buffer)=>{
    if (err) throw err;
    let data = buffer.toString('utf8');
    console.log(data);
    let gotten_username = undefined;
    let gotten_password = undefined;
    let gotten = false;
    for ([v,i] of data.split("\n").entries()) {
      console.log(v,i);
      console.log(gotten);
      console.log(username);
      console.log(password);
      if (i%2 == 0) {
        if (username.trim() == v.trim()) {
          gotten_username = v;
          gotten = true;
        }
      }
      if (i%2 == 1 && gotten == true) {
        if (password == v) {
          gotten_password = v;
        }
        else {
          valid_password = false;
          break;
        }
      }
    }
    if (gotten == false) {
      valid_username = false;
    }
    if (valid_password && valid_username) {
      res.cookie("user",username);
      res.render('index');
    }
    else if (valid_password == false) {
      res.cookie("no_pp",true);
      res.render('login');
    }
    else {
      res.cookie("ur_mom_bad",true);
      res.render('login');
    }
  })
});

module.exports = router;
