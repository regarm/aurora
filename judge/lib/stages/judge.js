//Judge Stages
//
//	Stages:
//		1. compile
//		2. run
//		3. evaluate
//		4. send
//
//

//
var async = require('async');
var compile = require('./compile');
var Cache = require('../caches');
var runner = require('./runner');
// var evaluater = require('./evaluater');
// var ajutils = require('../ajutils');

/**
Beware of nodejs object assignment. Object assignment is done by reference.
To deep copy use either one :
data.submission = Object.assign({}, submission );
util._extend

*/

// function runSubtask(subtask, cb){
// 	var exe = path.join('submission', data.submission.submissionId);
// 	var input = path.join('io', subtask.input);
// 	var output = path.join('submission', subtask.input + '_' + subtask.output);
// 	var cmd = exe + " < " + input + " > " + output;
// 	var options = {
// 		cwd: path.join(__dirname, 'runtime'),
// 		encoding: 'utf8',
// 		shell: '/bin/bash',
// 		env: null
// 	}
// 	console.log(cmd);
// 	var child = exec(cmd, options, function (error, stdout, stderr){
// 		if(stderr){
// 			subtask.RUN_TIME_ERROR = true;
// 			subtask.RUN_TIME_ERROR_VAL = stderr;
// 		} else {
// 			if (error) {
// 				console.error(`exec error: ${error}`);
// 				return cb(error);
// 			}
// 			console.log('Ran successfull');
// 		}
// 		return cb(null);
// 	});
// }
// function runSubtasks(subtasks, cb){
// 	async.each(subtasks.io, runSubtask, function (err){
// 		cb(err);
// 	});
// }
// function runTasks(cb){
// 	async.each(data.tasks, runSubtasks, function (err){
// 		cb(err);
// 	});
// }
// function evaluate(cb){
// 	async.each(data.tasks,
// 	function (subtasks, cb){
// 		async.each(subtasks.io, 
// 		function (subtask, cb){

// 			cb(null);
// 		}, 
// 		function (err){
// 			cb(err);
// 		});
// 	},
// 	function (err){
// 		cb(err);
// 	});	
// }
// function send(cb){
// 	cb(null);
// }
// function run(submission){
// 	data.submission = Object.assign({}, submission );
// 	async.series([
// 		fetchSubmission,
// 		fetchProblemTasks,
// 		fetchTask,
// 		function (cb){
// 			compile.compile(data, cb);
// 		},
// 		runTasks,
// 	],
// 	function (err){
// 		if(err){
// 			if(err.message = "COMILATION_ERROR"){
// 				console.log('COMPILATION_ERROR');
// 				console.log(data.COMPILATION_ERROR_VAL);
// 			} else {
// 				return cb(err);
// 			}
// 		}
// 		async.series([
// 			evaluate,
// 			send
// 		], function (err){
// 			if(err){
// 				console.log(err);
// 			}
// 			console.log('Submission ' + submission.submissionId + ' success');
// 			console.log(util.inspect(data, false, null))
// 		})
// 	});
// }



// function redact(item){
// 	ajutils.enqueueProblem(item);
// 	ajutils.enqueueSubmission(item);
// }
// function send(item, log, callback){
// 	callback();
// }
function fakerun(item, cb){
	var log = {};
	async.series([
		// function (callback){
		// 	setTimeout(callback, 3000);
		// },
		function (callback){
			console.log('Determining tasks');
			var problem = Cache.ProblemTasksCache.get(item.contestCode + "_" + item.problemCode);
			if(problem && problem.tasks){
				item.tasks = problem.tasks;
				callback();
			} else {
				log.TASKS_NOT_FOUND = true;
				callback(new Error("Tasks not found !"));
			}
		},
		function (callback){
			console.log('compiling');
			compile(item, log, callback);
		},
		function (callback){
			console.log('running');
			runner.run(item, log, callback);
		},
		// function (callback){
		// 	evaluater.evaluate(item, log, callback);
		// },
		// function (callback){
		// 	send(item, log, callback);
		// }
	],function (err){
		if(err){
			/* failed to judge */
			console.log('failed to judge');
			// redact(item);
		}
		console.log(err);
		console.log(log);
		cb();
	})
}

module.exports = fakerun;