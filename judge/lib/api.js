//API needed for judge
//
//
//****************
//	1. [fetchProblemTasks(data, cb)](#fetchProblemTasks)
//			data = {
//			"problemCode" : "---",
//			"contestCode" : "---"
//			}
//	2. [fetchSolution(data, cb)](#fetchSolution)  
//
//			data = {
//			"submissionId" : "---",
//			"problemCode" : "---",
//			"contestCode" : "---"
//			}
//****************



//
var request = require('request');
var conf = require('../conf');
var fs = require('fs');
var path = require('path');
var async = require('async');

function api(){
	var self = this;

	fetch = function fetch(url, cb){
		var headers = {
	      'Content-Type': 'application/json'
	    };
	    request.post({url: url, headers: headers}, function (err, httpres, body){
	    	if(err){
	    		return cb(err);
	    	}
	    	if(httpres.statusCode !== 200){
	    		return cb(new Error(url + ' returned ' + httpres.statusCode));
	    	} else {
	    		return cb(null, JSON.parse(body));
	    	}
	    });
	}

	fetchFile = function fetchFile(file, cb){
		var url = conf.api + '/fetchFile/' + file;
		fetch(url, function (err, response){
			if(err){
				return cb(err);
			} else {
				fs.writeFile(path.join(conf.runtime_dir, 'io', file), response.value, function (err){
					cb(err);
				})
			}
		})
	}

	fetchIO = function fetchIO(io, cb){
		async.each(io, fetchFile, function (err){
			cb(err);
		})
	}

	fetchSubtask = function fetchSubtask(subtask, cb){
		async.each(subtask.io, fetchIO, function (err){
			cb(err);
		})
	}

	//<a name="fetchTask" ></a>
	fetchTask = function fetchTask(data, cb){
		async.each(data, fetchSubtask, function (err){
			cb(err);
		})
	}







	//<a name="fetchProblemTasks" ></a>
	self.fetchProblemTasks = function fetchProblemTasks(data, cb){
		var url = conf.api + '/' + data.contestCode + '/' + data.problemCode + '/getProblemTasks';
		fetch(url, function (err, response){
			if(err){
				return cb(err);
			}else {
				fetchTask(response, function (err){
					if(err){
						return cb(err);
					} else {
						return cb(null, response);
					}
				})
			}
		})
	}

	//<a name="fetchSolution" ></a>
	self.fetchSolution = function fetchSolution(data, cb){
		var url = conf.api + '/' + data.contestCode + '/' + data.problemCode + '/' + data.submissionId + '/getSolution';
		fetch(url, function (err, response){
			if(err){
				return cb(err);
			} else {
				fs.writeFile(path.join(conf.runtime_dir, 'submission', data.submissionId + '.cpp'), response.solution, function (err){
					if(err){
						cb(err);
					} else {
						cb(null);
					}
				})
			}
		})
	}
}

module.exports = api;
