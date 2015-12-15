var express = require('express');
var router = express.Router();

router.post('/login', function(req,res){
	//TODO - LOGIN
	res.redirect('content/index.html');
	res.end("Login");
});

router.all('/logout',function(req,res){
	//TODO - LOGOUT
	res.end("Logout");
});

//Route for everthing else

router.all('*', express.static('public/'));


module.exports = router;