module.exports = function(app, passport) {

	//Route to the content, checks auth ,rendered with Handlebars
	app.get('/content', isLoggedIn, function (req,res) {
		res.render('index', {layout: false});
	});

	//Route to the login page
	app.get('/login', function (req,res) {
		res.render('login', {layout: false});
	});

	//Routes the login-process, checks auth, redirect
	app.post('/login',
	passport.authenticate('local-login', { 	successRedirect: '/content',
	failureRedirect: '/',
	failureFlash: true
}));

//Route to Logout-process -> back to login page
app.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
});

//Route to the signup page
app.get('/signup', function(req,res){
	res.render('signup');
});

//Route to the signup process -> redirect to content or back to signup page
app.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/content', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	//failureFlash : true // allow flash messages
}));

//Route to the verify process
app.get('/verify', function(req, res){
	//Get token and email from GET
	var tokentocheck = req.query.id;
	var emailtocheck = req.query.email;

	//Gets User-Model
	var User = require('../models/user');
	//Find the user by email
	User.findOne({'local.email' : emailtocheck}, function(err, user){
		if(err){
			res.end("Token not set");
		}
		if(user){
			//Sets the DB-Token to 0 if GET-Token equals DB-Token
			if(tokentocheck===user.local.token){
				user.local.token = 0;
				user.save();
				res.end("Your account is now verified");
			} else {
				res.end("Error: Token doesn't match email");
			}
		}
	});
});


//Function to check if the use is authenticated to access the route
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
	return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}


};
