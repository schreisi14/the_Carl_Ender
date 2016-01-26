var sec = require('./securityfunc');

module.exports = function(app, passport){

	app.get('/alltasks', sec.isLoggedIn,function (req,res) {
		//Get All Tasks from the User
		var Task = require('../models/task');
		Task.find({'local.user':req.user.local.email},function(err,task){
			if(err){
				console.log("ERROR::TASK::GET::" + err);
			}
			if(!task){
				console.log('NO TASK @ TASK');
			}
			res.end(JSON.stringify(task));
		}).sort({'local.date': -1});
	});

	app.delete('/task', sec.isLoggedIn,function (req,res) {
		//Deletes One Task from the User
		var Task = require('../models/task');
		Task.remove({'_id':req.query.taskid},function(err,msg){
			if(err){
				console.log("ERROR::TASK::DELETE::"+err);
			}
			res.end();
		});
	});

	app.get('/onetask', sec.isLoggedIn,function (req,res) {
		var Task = require('../models/task');
		//Get One Task from the User
		Task.findOne({'_id':req.query.taskid},function(err,task){
			if(err){
				console.log("ERROR::TAKS::GET"+err);
			}
			if(!task){
				console.log('NO TASK @ ONE TASK');
			}
			res.end(JSON.stringify(task));
		});
	});

	//Render addTask-Site
	app.get('/addtask', sec.isLoggedIn, function(req,res){
		console.log(req.user);
		if (req.user.local.token==='0') {
			res.render('addtask', {title: 'Add Task', user: req.user});
		} else {
			req.flash('error','Please Confirm your Account');
			res.render('addtask', {title: 'Add Task', user: req.user, error: req.flash('error'), info: req.flash('info')});
		}
	});

	//Saves One Task from the User
	app.post('/task', sec.isLoggedIn, function(req,res){
		//Debug
		console.log(req.user.local.email);
		console.log(req.body.name);
		console.log(req.body.date);
		console.log(req.body.time);
		console.log( req.body.place);
		console.log(req.body.text);

		var Task = require('../models/task');
		//Check if Task is already inserted
		Task.findOne({'local.user':req.user.email, 'local.name':req.body.name},function(err,task){
			if(err){
				console.log("ERROR::TASK::POST:" + err);
			}
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
				newTask.local.time = req.body.time;
				//Make sure Place is not empty
				if(req.body.place===""){
					req.body.place = "EVERYWHERE";
				}
				newTask.local.place = req.body.place;

				newTask.local.text = req.body.text;

				//Saves the new Task
				newTask.save(function(err) {
					if (err){
						req.flash('error','Opps! Something went wrong');
						console.log('ERROR:TASK::POST' + err);
					}
					//Redirect to the content page
					res.redirect('/content');
				});
			} else {
				req.flash('error','Opps! Something went wrong');
				res.redirect('/addtask');
			}
	});
});


};
