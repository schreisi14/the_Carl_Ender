var sec = require('./securityfunc');

module.exports = function(app, passport){

	//Route to the content, checks auth ,rendered with Handlebars
	app.get('/content', sec.isLoggedIn, function (req,res) {
		//Get All Tasks from the User
		var Task = require('../models/task');
		Task.find({'local.user':req.user.local.email},function(err,task){
			if(err){
				console.log(err);
			}
			if(!task){
				console.log('NO TAKS');
			}
			//Render the index with all tasks
			res.render('index', {layout: false, task: task, user: req.user});
		}).sort({'local.date': 1});
	});


};
