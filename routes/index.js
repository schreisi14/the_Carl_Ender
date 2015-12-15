var express = require('express');
var router = express.Router();
var passport = require('passport');

//Rout to Login
router.post('/login', 
	 passport.authenticate('local', { 	successRedirect: 'content/index.html',
                                   		failureRedirect: '/login',
                                   		failureFlash: true 
                                   	}));

//Rout when LoginFails
router.get('/login',function(req,res){
	res.end("ungültig");
});


//Route to Logout - Unused atm
router.all('/logout',function(req,res){
	//TODO - LOGOUT
	res.end("Logout");
});

//Route for everthing else
router.all('*', express.static('public/'));


module.exports = router;