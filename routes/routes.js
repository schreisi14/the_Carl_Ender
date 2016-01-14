module.exports = function(app, passport) {

		//Route to the content, rendered with Handlebars
		app.get('/content', isLoggedIn, function (req,res) {
			res.render('index', {layout: false});
		});

		app.get('/login', function (req,res) {
			res.render('login', {layout: false});
		});

		//Routes the login
		app.post('/login',
			 passport.authenticate('local-login', { 	successRedirect: '/content',
		                                   		failureRedirect: '/',
		                                   		failureFlash: true
		                                   	}));

		//Route to Logout - Unused atm
		app.get('/logout',function(req,res){
  		req.logout();
  		res.redirect('/');
		});


		app.get('/signup', function(req,res){
			res.render('signup');
		});

		app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/content', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        //failureFlash : true // allow flash messages
    }));

		app.get('/verify', function(req, res){
			var tokentocheck = req.query.id;
			var emailtocheck = req.query.email;
			var User = require('../models/user');
			User.findOne({'local.email' : emailtocheck}, function(err, user){
					if(err){
						res.end("Token not set")
					}
					if(user){
						console.log('TOKEN:: ' + user.local.token);
						res.end("YEAH");
						user.local.token = 0;
						user.save();

						//User.update({'_id':})
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
