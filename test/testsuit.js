var request = require('superagent');
var assert = require('assert');
var User = require('../models/user.js');
var mongoose = require('mongoose');
var conf = require('../config/config.js');


var testemail = 'test@testcase.at';

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
		var testRegisterUser = request
		.post('http://localhost:8000/signup')
		.send({email : testemail, password : 'testcase'})
		.end(function(err,res){
			if(err){
				console.log(err);
			}
			test.equal(res.status,200,'We expect Status 200');
			test.done();
		});
	},
	testFindUser: function(test){
		User.findOne({'local.email': testemail}, function(err,user){
			if(err){
				console.log('testFindUser - Error -> no User found');
			}
			if(user){
				test.ok(true, 'User found!');
				test.done();
			}
		});
	},
	testLogin: function(test){
		var testLoginUser = request
		.post('http://localhost:8000/login')
		.send({email : testemail, password : 'testcase'})
		.end(function(err,res){
			if(err){
				console.log(err);
			}
			test.equal(res.status,200,'We expect Status 200');
			test.done();
		});
	},
	
	testDeleteUser: function(test){
		User.remove({'local.email': testemail}, function(err,p){
			if(err){
				console.log('testDeleteUser - Error -> no User found');
				test.ok(false,'No User deleted!');
			}
			console.log('Delete Info: ' + p);
			test.ok(true);
			test.done();
		});
	},

};
