#!/usr/bin/env node

"use strict";
var request = require('superagent');
var assert = require('assert');

var testGetRoot = request
.get('http://localhost:8000/')
.send()
.end(function(err,res){
	if(err){
		console.log(err);
	} else{
		assert.ok(200 == res.status, "We expect Status 200");
	}
});

var testGetLogin = request
.get('http://localhost:8000/login')
.send()
.end(function(err,res){
	if(err){
		console.log(err);
	} else{
		assert.ok(200 == res.status, "We expect Status 200");
	}
});

var testGetSignUp = request
.get('http://localhost:8000/signup')
.send()
.end(function(err,res){
	if(err){
		console.log(err);
	} else{
		assert.ok(200 == res.status, "We expect Status 200");

	}
});

console.log("If there was no error -> YEAH!");
