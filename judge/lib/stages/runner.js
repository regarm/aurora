var async = require('async');
var path = require('path');
var conf = require('../../conf');
const exec = require('child_process').exec;
var process = require('process');
var procfs = require('procfs-stats');
var fs = require('fs');

function runSubtask(item, log, subtasks, subtask, cb){
	var exe = path.join('submission', item.submissionId);
	var input = path.join('io', subtask.input);
	var output = path.join('submission', subtask.input + '_' + subtask.output);
	var cmd = exe + " < " + input + " > " + output;
	var options = {
		cwd: conf.runtime_dir,
		encoding: 'utf8',
		shell: '/bin/bash',
		timeout: subtasks.timeLimit * 1000,
		env: null
	}
	var startTime = process.hrtime();
	var child = exec(cmd, options, function (error, stdout, stderr){
		var totalTime = process.hrtime(startTime);
		if(error){
			if(error.killed && error.signal === 'SIGTERM'){
				log.TIME_LIMIT_EXCEED_ERROR = true;
				log.TIME_LIMIT_EXCEED_ERROR_VAL = '';
				return cb(new Error(error));
			} else {
				log.JUDGE_ERROR = true;
				log.JUDGE_ERROR_VAL = 'Unknown error occured on judge while running';
				return cb(error);
			}
		} else {
			if(stderr){
				log.RUN_TIME_ERROR = true;
				log.RUN_TIME_ERROR_VAL = stderr;
				return cb(null);
			} else {
				log.RUN_TIME_ERROR = false;
				return cb(null);
			}
		}
	});
	console.log(path.join('/proc', child.pid + '', 'status'));
	fs.watch(path.join('/proc', child.pid + '', 'status'), function(err, val){
		console.log('file watch');
		console.log(err);
		console.log(val);
	})
	child.on('exit', function () {
		console.log();
		console.log('exited');
		console.log();
	})
}

function runSubtasks(item, log, subtasks, cb){
	async.each(subtasks.io, function (subtask, callback){
		runSubtask(item, log, subtasks, subtask, callback);
	}, function (err){
		cb(err);
	});
}

function runTasks(item, log, cb){
	async.each(item.tasks, function (subtasks, callback){
		runSubtasks(item, log, subtasks, callback);
	}, function (err){
		cb(err);
	});
}

function run(item, log, cb){
	runTasks(item, log, function (err){
		if(err){
			return cb(err);
		} else {
			cb(null);
		}
	})
}

module.exports.run = run;