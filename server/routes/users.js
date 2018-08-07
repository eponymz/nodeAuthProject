var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/register', upload.single('profileImage'), function(
  req,
  res,
  next
) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  // var file = req.body.profileImage;

  if (req.file) {
    console.log('Uploading File...');
    var profileImage = req.file.filename;
  } else {
    console.log('No file uploaded');
    var profileImage = 'noimage.jpg';
  }

  // Form validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email is not vaild').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req
    .checkBody('password2', 'Passwords do not match')
    .equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    console.log('No errors');
  }
});

module.exports = router;
