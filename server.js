#!/usr/bin/env node

//Config File
var conf = require('./config/config.js');
//Express
var express = require('express');
var app = express();
var routes = require('./routes/index.js');
var passport = require('passport');
var localstrategy = require('./passport/localstrategy.js');
passport.use(localstrategy);

//Cookies
var cookieParser = require('cookie-parser');

//MiddleWare
app.use(cookieParser());
app.use(passport.initialize());
//TODO: PASSPORT


// Sets a cookie
var cookie = require('./helper/cookie.js');
app.use(cookie);

//Routes
app.use('/', routes);




//Server-Start
var server = app.listen(conf.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('%s by %s listening at http://%s:%s',conf.appname, conf.author, host, port);
});