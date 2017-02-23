var async = require('async');
var request = require('request');
var conf = require('./conf');
var fs = require('fs');
var path = require('path');
const exec = require('child_process').exec;
var compiler = require('./compiler');
var util = require('util');

var data = {};

/**
Beware of nodejs object assignment. Object assignment is done by reference.
To deep copy use either one :
data.submission = Object.assign({}, submission );
util._extend

*/

function fetch(url, cb){
	var headers = {
      'Content-Type': 'application/json'
    };
    request.post({url: url, headers: headers}, function (err, httpres, body){
    	if(err){
    		return cb(err);
    	}
    	if(httpres.statusCode !== 200){
    		return cb(url + ' returned ' + httpres.statusCode);
    	}
    	body = JSON.parse(body);
    	if(!body.success){
    		return cb(url + ' returned {success: false}');
    	}
    	return cb(null, body);
    });
}
function fetchSubmission(cb){
	var url = conf.api + '/' + data.submission.contestCode + '/' + data.submission.problemCode + '/' + data.submission.submissionId + '/getSolution';
	fetch(url, function (err, response){
		if(err){
			return cb(err);
		}
		fs.writeFile(path.join(__dirname, 'runtime/submission', data.submission.submissionId + '.cpp'), response.solution, function (err){
			cb(err);
		})
	})
}
function fetchProblemTasks(cb){
	var url = conf.api + '/' + data.submission.contestCode + '/' + data.submission.problemCode + '/getProblemTasks';
	fetch(url, function (err, response){
		if(err){
			return cb(err);
		}
		data.tasks = response.tasks;
		cb(null);
	})
}

function fetchFile(file, cb){
	var url = conf.api + '/fetchFile/' + file;
	fetch(url, function (err, response){
		if(err){
			return cb(err);
		}
		fs.writeFile(path.join(__dirname, 'runtime/io', file), response.value, function (err){
			cb(err);
		})
	})
}

function fetchIO(io, cb){
	async.each(io, fetchFile, function (err){
		cb(err);
	})
}
function fetchSubtask(subtask, cb){
	// console.log(subtask);
	async.each(subtask.io, fetchIO, function (err){
		cb(err);
	})
}
function fetchTask(cb){
	async.each(data.tasks, fetchSubtask, function (err){
		cb(err);
	})
}
function runSubtask(subtask, cb){
	var exe = path.join('submission', data.submission.submissionId);
	var input = path.join('io', subtask.input);
	var output = path.join('submission', subtask.input + '_' + subtask.output);
	var cmd = exe + " < " + input + " > " + output;
	var options = {
		cwd: path.join(__dirname, 'runtime'),
		encoding: 'utf8',
		shell: '/bin/bash',
		env: null
	}
	console.log(cmd);
	var child = exec(cmd, options, function (error, stdout, stderr){
		if(stderr){
			subtask.RUN_TIME_ERROR = true;
			subtask.RUN_TIME_ERROR_VAL = stderr;
		} else {
			if (error) {
				console.error(`exec error: ${error}`);
				return cb(error);
			}
			console.log('Ran successfull');
		}
		return cb(null);
	});
}
function runSubtasks(subtasks, cb){
	async.each(subtasks.io, runSubtask, function (err){
		cb(err);
	});
}
function runTasks(cb){
	async.each(data.tasks, runSubtasks, function (err){
		cb(err);
	});
}
function evaluate(cb){
	async.each(data.tasks,
	function (subtasks, cb){
		async.each(subtasks.io, 
		function (subtask, cb){

			cb(null);
		}, 
		function (err){
			cb(err);
		});
	},
	function (err){
		cb(err);
	});	
}
function send(cb){
	cb(null);
}
function run(submission){
	data.submission = Object.assign({}, submission );
	async.series([
		fetchSubmission,
		fetchProblemTasks,
		fetchTask,
		function (cb){
			compiler.compile(data, cb);
		},
		runTasks,
	],
	function (err){
		if(err){
			if(err.message = "COMILATION_ERROR"){
				console.log('COMPILATION_ERROR');
				console.log(data.COMPILATION_ERROR_VAL);
			} else {
				return cb(err);
			}
		}
		async.series([
			evaluate,
			send
		], function (err){
			if(err){
				console.log(err);
			}
			console.log('Submission ' + submission.submissionId + ' success');
			console.log(util.inspect(data, false, null))
		})
	});
}

module.exports.run = run;