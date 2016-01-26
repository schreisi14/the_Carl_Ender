#!/usr/bin/env node

//Requirements
var conf = require('./config/config.js');                   //Config File
var express = require('express');                           //Express-Framework
var app = express();                                        //Init Express
var passport = require('passport');                         //Manages auth
var flash = require('connect-flash');                       //Is required by Passport -> handles flash-messages
var bodyParser = require('body-parser');                    //Is required by Passport -> parses POST-Body
//var cookieParser = require('cookie-parser');                //Parse Cookie Header and populate req.cookies with an object keyed by the cookie names
var exphbs  = require('express-handlebars');                //View Engine Handlebars
var mongoose = require('mongoose');                         //DB-Handler


//DB-Config
mongoose.connect(conf.url);           //Loads the URL from the DB from the Config

//Passport-Config
require('./passport/ppconf.js')(passport); //Loads the configuration for Passport

//MiddleWare -> Can execute any code, make changes to the req/resp, end the req,res cycle, call next middleware
//app.use(cookieParser());
app.use(bodyParser());
app.use(require('express-session')({    //Is required by Passport -> creates & sets a Session
    name: 'carlEnderSessionId',         //Name of the Session-Cookie
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 900000 },
    secret: conf.secret,                //Uses the secret to create the hash for the Session-id
    resave: false,                      //Prevent a Session to be saved back to the Session-Store
    saveUninitialized: false            //Prevent a Session that is "uninitialized" to be saved to the Session-Store
}));
app.use(passport.initialize());         //Initialize Passport
app.use(passport.session());            //Starts a passport-session
app.use(flash());

//Create View Render + set a Helper for Formating Dates
var hbs = exphbs.create({
  extname: '.hbs',
  helpers: {'dataFormat': function(date){return date.toLocaleDateString();}},
});
// date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
//Set View Engine / View Render
app.engine('.hbs', hbs.engine);  //Register Handlebars as Renderengine
app.set('view engine', '.hbs');                 //.hbs Files in the views folger are now rendered with Handlebars


//ROUTES
app.use(express.static(__dirname + '/public')); //Serves every static file in the public folder
require('./routes/routes.js')(app, passport);   //Manages our routing


//Server-Start
var server = app.listen(conf.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('%s by %s listening at http://%s:%s',conf.appname, conf.author, host, port);
});
