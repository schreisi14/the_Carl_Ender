module.exports = function(app, passport) {

	//Route to the content, checks auth ,rendered with Handlebars
	app.get('/content', isLoggedIn, function (req,res) {
		var Task = require('../models/task');
		Task.findOne({'local.user':req.user.local.email},function(err,task){
			if(err){
				console.log(err);
			}
			if(!task){
				console.log('NO TAKS');
			}
			res.render('index', {layout: false, task: task});
		});
	});

	app.get('/task', isLoggedIn, function(req,res){
		res.render('create');
	});

	app.post('/task',isLoggedIn, function(req,res){
		var Task = require('../models/task');
		console.log('User: '+req.user.local.email+'Name: '+ req.body.name);

		Task.findOne({'local.user':req.user.email, 'local.name':req.body.name},function(err,task){
			if(err){
				res.end("Error reading your tasks");
			}
			if(!task){
				var newTask = new Task();

				newTask.local.user = req.user.local.email;
				newTask.local.name = req.body.name;
				newTask.local.place = req.body.place;
				newTask.local.text = req.body.text;


				newTask.save(function(err) {
					if (err){
						throw err;
					}
					console.log('Redirect');
					res.redirect('/content');
				});
			}

			res.redirect('/content');
	});
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
