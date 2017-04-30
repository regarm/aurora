var async = require('async');

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

function runTasks(item, log, cb){
	async.each(item.tasks, function(subtasks, callback){
		runSubtasks(item)
	}, function (err){
		cb(err);
	});
}

function run(item, log, cb){
	console.log('Running');
	async.series([
		function (callback){
			api.fetchProblemTasks(item, function (err, response){
				if(err){
					return callback(err);
				} else {
					item.tasks = response;
					callback(null);
				}
			});
		},
		function (callback){
			runTasks(item, log, function (err){
				if(err){
					return callback(err);
				} else {
					callback();
				}
			})
		}
	],
	function (err){
		cb();
	});
}

module.exports.run = run;