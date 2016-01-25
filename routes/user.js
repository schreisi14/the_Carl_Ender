var sec = require('./securityfunc');

module.exports = function(app, passport){
	
	app.get('/user', sec.isLoggedIn, function(req,res){
				res.render('profile',{user: req.user});
	});

	app.post('/user', sec.isLoggedIn, function(req,res){
		var User = require('../models/user');
		//Find the user by email
		User.findOne({'local.email' : req.user.local.email}, function(err, user){
			if(err){
				res.end("No User!");
			}
			if(user){
				user.local.name = req.body.name;

				user.save(function(err) {
					if (err){
						console.log('Error' + err);
					}
					res.redirect('/user');
				});
			}
		});
	});
};
