#!/usr/bin/env node

//Requirements
var conf = require('./config/config.js');                   //Config File
var express = require('express');                           //Express-Framework
var app = express();                                        //Init Express
var routes = require('./routes/index.js');                  //Manages the Routing
var passport = require('passport');                         //Manages auth
var localstrategy = require('./passport/localstrategy.js'); //Manages auth-process
var flash = require('connect-flash');                       //Is required by Passport -> handles flash-messages
var bodyParser = require('body-parser');                    //Is required by Passport -> parses POST-Body
var cookieParser = require('cookie-parser');                //Parse Cookie Header and populate req.cookies with an object keyed by the cookie names
var cookie = require('./helper/cookie.js');                 //Sets a Cookie when the Website is visited

//MiddleWare -> Can execute any code, make changes to the req/resp, end the req,res cycle, call next middleware
app.use(cookieParser());
app.use(cookie);
app.use(bodyParser());
app.use(require('express-session')({    //Is required by Passport -> creates & sets a Session
    name: 'carlEnderSessionId',                //Name of the Session-Cookie
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 900000 },
    secret: conf.secret,                //Uses the secret to create the hash for the Session-id
    resave: false,                      //Prevent a Session to be saved back to the Session-Store
    saveUninitialized: false            //Prevent a Session that is "uninitialized" to be saved to the Session-Store
}));
app.use(passport.initialize());         //Is required by Passport
app.use(passport.session());            //Is required by Passport
app.use(flash());                       //Is required by Passport
app.use('/', routes);                   //Should be last, so every middleware gets called

//Passport-Settings                             //TODO - Logic is ATM USER==PASS
passport.use(localstrategy);                    //Logic when Auth is correct
passport.serializeUser(function(user, done) {   //Determines what data from the User-Object should be stored in the Session
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {   //Gets the User ID from the Session
    done(null, 'heli');
});

//Server-Start
var server = app.listen(conf.port, function () { 
  var host = server.address().address;
  var port = server.address().port;

  console.log('%s by %s listening at http://%s:%s',conf.appname, conf.author, host, port);
});