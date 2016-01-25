var sec = require('./securityfunc');

module.exports = function(app, passport){

	app.get('/task', sec.isLoggedIn,function (req,res) {
		//Get All Tasks from the User
		var Task = require('../models/task');
		Task.find({'local.user':req.user.local.email},function(err,task){
			if(err){
				console.log(err);
			}
			if(!task){
				console.log('NO TAKS');
			}
			console.log(task);
			//Render the index with all tasks
			//res.send(tasktosend);
			res.end(JSON.stringify(task));
		}).sort({'local.date': 1});
	});

	app.delete('/task', sec.isLoggedIn,function (req,res) {
		//Get All Tasks from the User
		var Task = require('../models/task');
		Task.remove({'_id':req.query.taskid},function(err,msg){
			console.log("DELETE");
			if(err){
				console.log(err);
			}
			console.log(msg);
			//Render the index with all tasks
			//res.send(tasktosend);
			res.end();
		});
	});

	app.get('/getonetask', sec.isLoggedIn,function (req,res) {
		//Get All Tasks from the User
		var Task = require('../models/task');
		console.log('TAKS ID: ' + req.query.taskid );
		Task.findOne({'_id':req.query.taskid},function(err,task){
			if(err){
				console.log(err);
			}
			if(!task){
				console.log('NO TAKS');
			}
			console.log(task);
			//Render the index with all tasks
			//res.send(tasktosend);
			res.end(JSON.stringify(task));
		});
	});

	//Render Task-Render-Site
	app.get('/addtask', sec.isLoggedIn, function(req,res){
		res.render('create', {user: req.user.local.email});
	});

	//Saves Task
	app.post('/task', sec.isLoggedIn, function(req,res){
		//Debug
		console.log(req.user.local.email);
		console.log(req.body.name);
		console.log(req.body.date);
		console.log(req.body.time);
		console.log( req.body.place);
		console.log(req.body.text);

		var Task = require('../models/task');
		//Check if Task is already insert
		Task.findOne({'local.user':req.user.email, 'local.name':req.body.name},function(err,task){
			if(err){
				res.end("Error reading your tasks");
			}
			console.log("Debug task " + task);
			//If task doesn't exist
			if(!task){
				//Create new Task
				var newTask = new Task();
				//Sets its params
				newTask.local.user = req.user.local.email;
				if(req.body.name===""){
					req.body.name = "The-Task-Without-A-Name";
				}
				newTask.local.name = req.body.name;

				//Makes sure Date is not empty
				if(req.body.date===""){
					req.body.date = Date.now();
				}
				newTask.local.date = req.body.date;
				//Makes sure Time is not empty
				if(req.body.time===""){
					req.body.time = new Date().toLocaleTimeString();
				}
				//Debug
				console.log("Test: " + req.body.time);
				newTask.local.time = req.body.time;
				if(req.body.place===""){
					req.body.place = "EVERYWHERE";
				}
				newTask.local.place = req.body.place;
				newTask.local.text = req.body.text;

				//Saves the new Task
				newTask.save(function(err) {
					if (err){
						console.log('Error' + err);
					}
					//Redirect to the content page
					res.redirect('/content');
				});
			} else {
				res.redirect('/content');
			}
	});
});


};
