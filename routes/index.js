//importing the libraries im going to use
var express = require('express');
var passport = require('passport');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
var requres = require('request')

//we are going to share data between server and UI so we will pass that in an env variable
var env = {
};

//Defining get request method on the router variable just responding
// with the template
router.get('/', function(req, res, next){
    res.render('index', {env:env});
})

//same with remaining routes
router.get('/login',function(req, res, next){
    res.render('login', {env:env});
})

//dont actually render a page just use an express function to logout and redirect to home page
router.get('/logout',function(req, res, next){
    req.logout();
    res.redirect('/');
})

router.get('/polls', ensureLoggedIn, function(req, res){
    if (!error && response.statusCode == 200) {
        var polls = JSON.parse(body);
        res.render('polls', {env:env, user: req.user, polls: polls});
    }else {
        res.render('error');
    }
})

router.get('/user', ensureLoggedIn, function(req, res, next){
    res.render('user', {env: env, user: req.user });
});

//export this module so we can import it in our app.js file
module.exports = router;