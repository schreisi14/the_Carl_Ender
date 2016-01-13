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
			 passport.authenticate('local', { 	successRedirect: '/content',
		                                   		failureRedirect: '/',
		                                   		failureFlash: true
		                                   	}));

		//Route to Logout - Unused atm
		app.get('/logout',function(req,res){
  		req.logout();
  		res.redirect('/');
		});


		app.get('/signup', function(req,res){
			res.end("Signup");
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
