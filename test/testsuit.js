var request = require('superagent');
var assert = require('assert');
var User = require('../models/user.js');
var mongoose = require('mongoose');
var conf = require('../config/config.js');
var Task = require('../models/task.js');


var testemail = 'test@testcase.at';
var testuser = request.agent();

module.exports={
	setUp: function(callback) {
		mongoose.connect(conf.url);
		console.log("YEAH");
		callback();
	},
	tearDown: function(callback) {
		mongoose.disconnect();
		callback();
	},
	testRegisterUser: function(test){
		testuser
		.post('http://localhost:8000/signup')
		.send({email : testemail, password : 'testcase'})
		.end(function(err,res){
			if(err){
				console.log(err);
			}
			test.equal(res.req.path,'/content','We expect you to see the /content page');
			test.done();
		});
	},
	testLogoutUser: function(test){
		testuser
		.get('http://localhost:8000/logout')
		.send()
		.end(function(err,res){
			if(err){
				console.log(err);
			}
			test.equal(res.req.path,'/','We expect you see the /login page');
			test.done();
		});
	},
	testLogin: function(test){
		testuser
		.post('http://localhost:8000/login')
		.send({email : testemail, password : 'testcase'})
		.end(function(err,res){
			if(err){
				console.log(err);
			}
			test.equal(res.req.path,'/content','We expect you to see the /content page');
			test.done();
		});
	},
	testCreateTask: function(test){
		testuser
		.post('http://localhost:8000/task')
		.send({name: 'test', date: '02/02/2017', time: '00:00', place: 'NY', text: 'TESTCASE'})
		.end(function(err,res){
			if(err){
				console.log(err);
			}
			test.equal(res.req.path,'/content','We expect you to see the /content page');
			test.done();
		});
	},
	testFindTask: function(test){
		Task.findOne({'local.text':'TESTCASE'}, function(err,task){
				if(err){
					console.log(err);
					task.false(true);
					task.done();
				}
				var taskid = task._id;
				testuser
				.get('http://localhost:8000/onetask?taskid='+taskid)
				.send()
				.end(function(err,res){
					if(err){
						console.log(err);
					}
					test.equal(JSON.parse(res.text).local.text,'TESTCASE');
					test.done();
				});
		});
	},
	// testDeleteTask: function(test){
	// 	Task.findOne({'local.text':'TESTCASE'}, function(err,task){
	// 			if(err){
	// 				console.log(err);
	// 				task.false(true);
	// 				task.done();
	// 			}
	// 			var taskid = task._id;
	//
	// 			testuser
	// 			.post('http://localhost:8000/task?taskid='+taskid)
	// 			.send8
	// 		});
	// },
	testDeleteUser: function(test){
		testuser
		.post('http://localhost:8000/deleteuser')
		.send({password:'testcase'})
		.end(function(err,res){
			if(err){
				console.log(err);
			}
			test.equal(res.req.path,'/','We expect you to see /');
			test.done();
		});
	}
};
