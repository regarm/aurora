var request = require('request');
var conf = require('../conf');
var fs = require('fs');
var path = require('path');
var async = require('async');

/**
Beware of nodejs object assignment. Object assignment is done by reference.
To deep copy use either one :
data.submission = Object.assign({}, submission );
util._extend

*/

module.exports.fetch = fetch;
module.exports.fetchSubmission = fetchSubmission;
module.exports.fetchProblemTasks = fetchProblemTasks;
module.exports.fetchFile = fetchFile;
module.exports.fetchTask = fetchTask;



function fetch(url, cb){
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
function fetchSubmission(data, cb){
	var url = conf.api + '/' + data.contestCode + '/' + data.problemCode + '/' + data.submissionId + '/getSolution';
	fetch(url, function (err, response){
		if(err){
			return cb(err);
		} else {
			fs.writeFile(path.join(__dirname, '/../runtime/submission', data.submissionId + '.cpp'), response.solution, function (err){
				if(err){
					cb(err);
				} else {
					cb();
				}
			})
		}
	})
}
function fetchProblemTasks(data, cb){
	var url = conf.api + '/' + data.contestCode + '/' + data.problemCode + '/getProblemTasks';
	fetch(url, function (err, response){
		if(err){
			return cb(err);
		}else {
			return cb(null, response);
		}
	})
}
function fetchFile(file, cb){
	var url = conf.api + '/fetchFile/' + file;
	fetch(url, function (err, response){
		if(err){
			return cb(err);
		} else {
			console.log(file);
			fs.writeFile(path.join(__dirname, '/../runtime/io', file), response.value, function (err){
				cb(err);
			})
		}
	})
}

function fetchIO(io, cb){
	async.each(io, fetchFile, function (err){
		cb(err);
	})
}
function fetchSubtask(subtask, cb){
	async.each(subtask.io, fetchIO, function (err){
		cb(err);
	})
}
function fetchTask(data, cb){
	async.each(data, fetchSubtask, function (err){
		cb(err);
	})
}