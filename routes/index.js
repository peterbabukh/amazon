var express = require('express');
//var passport = require('passport');
//var checkSession = require('../middleware/checkSession');
//var skipFavicon = require('../middleware/skipFavicon');

// middleware, checking if the user logged in
//var requireLogin = require('../middleware/requireLogin');


var router = express.Router();

// skips Favicon requests
//router.use(skipFavicon);

// checks if session exists
//router.use(checkSession);

// authorization routes
/*
router.get('/login', require('./login').get);
router.post('/login', require('./login').post);
router.get('/signup', require('./signup').get);
router.post('/signup', require('./signup').post);
router.get('/signupconf/:token', require('./signupconf').get);
router.get('/logout', require('./logout').get);
router.get('/signout', require('./signout').get);

// forgot password routes
router.get('/forgot', require('./forgot').get);
router.post('/forgot', require('./forgot').post);
router.get('/reset/:token', require('./reset').get);
router.post('/reset/:token', require('./reset').post);
*/
// page render routes
router.get('/', require('./home').get);

router.get('*', function(req, res){
    res.redirect('/');
});


module.exports = router;