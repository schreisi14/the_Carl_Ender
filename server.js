#!/usr/bin/env node
//Test
//Express
var express = require('express');
var app = express();

//CookieParser - Middleware for Express
var cookieParser = require('cookie-parser');


//Express-Middleware
app.use(cookieParser());

// Sets a cookie
app.use(function (req, res, next) {
  // checks if client sent a cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('CarlEnderCookieNr',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important! -> continue with express.static('public')
});


//Standard File-Handling
app.use(express.static('public'));


var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});