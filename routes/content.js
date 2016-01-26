var sec = require('./securityfunc');

module.exports = function(app, passport){

	//Route to the content, checks auth ,rendered with Handlebars
	app.get('/content', sec.isLoggedIn, function (req,res) {
		//Get All Tasks from the User
		var Task = require('../models/task');
		Task.find({'local.user':req.user.local.email},function(err,task){
			if(err){
				req.flash('Oops! Something went wrong');
				console.log("ERROR::CONTENT::GET::" + err);
			}
			if(!task){
				req.flash('Oops! Something went wrong');
				console.log('NO TASK @ CONTENT');
			}
			//Render the index with all tasks
			res.render('index', {task: task, user: req.user, error: req.flash('error'), info: req.flash('info')});
		}).sort({'local.date': -1});
	});


};
