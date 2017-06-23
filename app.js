//requiring dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');

//load environmental variables from .env
dotenv.load();

//import application code for routes
var routes = require('./routes/index');

//instantiate the Express JS framework, and assign it to a variable called app
var app = express();

//set the views directory, and tell express we are using Jade for templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set further configuration, define chain of events that happens when hit with request
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(session({
    //create a uniqure session identifier
    secret: 'inasweaterpoorlyknit',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//here we are adding our routes
app.use('/', routes);

//catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//If our application encounters an error, we'll display the error and stacktrace
//accordingly
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
});

//choose the port for the app to listen on. 
app.listen(3000);