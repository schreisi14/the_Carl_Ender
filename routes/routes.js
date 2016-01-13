module.exports = function(app, passport) {

		// app.get('/', express.static('/public'));

		app.get('/content', isLoggedIn, function (req,res) {
			res.render('index', {layout: false});
		});

		app.post('/login',
			 passport.authenticate('local', { 	successRedirect: '/content',
		                                   		failureRedirect: '/login',
		                                   		failureFlash: true
		                                   	}));

		//Rout when LoginFails
		app.get('/login',function(req,res){
			res.end("ungültig");
		});


		//Route to Logout - Unused atm
		app.get('/logout',function(req,res){
			//TODO - LOGOUT
			res.end("Logout");
		});

		app.get('/signup', function(req,res){
			res.end("Signup");
		});

		//Route to the content, with auth checked
//		app.get('/content', isLoggedIn, express.static('views'));



		//Function to check if the use is authenticated to access the route
		function isLoggedIn(req, res, next) {

		    // if user is authenticated in the session, carry on
		    if (req.isAuthenticated())
		        return next();

		    // if they aren't redirect them to the home page
		    res.redirect('/');
		}

		// // =====================================
    // // HOME PAGE (with login links) ========
    // // =====================================
    // app.get('/', function(req, res) {
    //     res.render('index.ejs'); // load the index.ejs file
    // });
		//
    // // =====================================
    // // LOGIN ===============================
    // // =====================================
    // // show the login form
    // app.get('/login', function(req, res) {
		//
    //     // render the page and pass in any flash data if it exists
    //     res.render('login.ejs', { message: req.flash('loginMessage') });
    // });
		//
    // // process the login form
    // // app.post('/login', do all our passport stuff here);
		//
    // // =====================================
    // // SIGNUP ==============================
    // // =====================================
    // // show the signup form
    // app.get('/signup', function(req, res) {
		//
    //     // render the page and pass in any flash data if it exists
    //     res.render('signup.ejs', { message: req.flash('signupMessage') });
    // });
		//
    // // process the signup form
    // // app.post('/signup', do all our passport stuff here);
		//
    // // =====================================
    // // PROFILE SECTION =====================
    // // =====================================
    // // we will want this protected so you have to be logged in to visit
    // // we will use route middleware to verify this (the isLoggedIn function)
    // app.get('/profile', isLoggedIn, function(req, res) {
    //     res.render('profile.ejs', {
    //         user : req.user // get the user out of session and pass to template
    //     });
    // });
		//
    // // =====================================
    // // LOGOUT ==============================
    // // =====================================
    // app.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });
};
