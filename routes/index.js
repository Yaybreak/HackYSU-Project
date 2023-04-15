var express = require('express');
var fs = require("fs");
var jsonfile = require("jsonfile");
var Cookie = require("js-cookie");
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
router.get('/devices.html', function(req, res, next) {
  let user = req.cookies.user;
  let data = jsonfile.readFileSync("C:/xampp/htdocs/HackYSU Project/private/userdata/data.json");
  let devices = Object.keys(data[user].devices);
  res.render('devices', { devices });
});
router.post('/bob',function(req,res,next) {
  let username = req.body.username;
  let password = req.body.password;
  jsonfile.writeFile("C:/xampp/htdocs/HackYSU Project/private/userdata/data.json",{[username]:{
    password,
    devices: {}
  }},(err)=>{
    if(err) throw err;
  });
  res.render('index');
});

router.post('/billy',function(req,res,next) {
  let username = req.body.username;
  let password = req.body.password;
  let data = jsonfile.readFileSync("C:/xampp/htdocs/HackYSU Project/private/userdata/data.json");
  if (username in data) {
    if (password == data[username].password) {
      res.clearCookie("no_pp");
      res.clearCookie("ur_mom_bad");
      res.cookie("user",username);
      res.render('index');
    }
    else {
      res.clearCookie("no_pp");
      res.clearCookie("ur_mom_bad");
      res.cookie("no_pp",true);
      res.render('login');
    }
  }
  else {
    res.clearCookie("no_pp");
    res.clearCookie("ur_mom_bad");
    res.cookie("ur_mom_bad",true);
    res.render('login');
  }
});

router.post("/joe",function(req,res,next) {
  let user = req.cookies.user;
  let devicename = req.body.devicename;
  let random_data = req.body.randomdata;
  let data = jsonfile.readFileSync("C:/xampp/htdocs/HackYSU Project/private/userdata/data.json");
  if (devicename in data[user].devices) {
    res.cookie("d_nuts",true);
    res.render('devices');
  }
  else {
    jsonfile.writeFileSync("C:/xampp/htdocs/HackYSU Project/private/userdata/data.json",{[user]:{
      devices: {
        [devicename]:{
          random_data
        }
      }
    }});
    res.clearCookie("d_nuts");
    res.render("devices");
  }
});

router.post("/john",function(req,res,next) {
  let user = req.cookies.user;
  let devicename = req.body.devicename;
  let data = jsonfile.readFileSync("C:/xampp/htdocs/HackYSU Project/private/userdata/data.json");
  if (devicename in data[user].devices) {
    delete data[user].devices[devicename];
    fs.writeFileSync("C:/xampp/htdocs/HackYSU Project/private/userdata/data.json",JSON.stringify(data),(err)=>{
      if (err) throw err;
    });
    res.render("devices");
  }
  else {
    res.cookie("depression",true);
    res.render("devices");
  }
})

module.exports = router;
