var express = require('express');
var router = express.Router();
var passport = require('passport');


//Rout to Login
router.post('/login',
	 passport.authenticate('local', { 	successRedirect: '/content',
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

//Route to the content, with auth checked
router.all('/content', isLoggedIn, express.static('views'));



//Function to check if the use is authenticated to access the route
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
