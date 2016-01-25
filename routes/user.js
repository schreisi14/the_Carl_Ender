var sec = require('./securityfunc');

module.exports = function(app, passport){

	app.get('/profile', sec.isLoggedIn, function(req,res){
				res.render('profile',{title: 'Profile', user: req.user, error: req.flash('error'), info: req.flash('info')});
	});

	app.post('/user', sec.isLoggedIn, function(req,res){
		var User = require('../models/user');
		//Find the user by email
		User.findOne({'local.email' : req.user.local.email}, function(err, user){
			if(err){
				console.log("ERROR:USER::POST::" + err);
			}
			if(user){
				user.local.name = req.body.name;
				user.save(function(err) {
					if (err){
						console.log('Error' + err);
					}
					req.flash('info','Your name was set');
					res.redirect('/profile');
				});
			}
		});
	});
};
