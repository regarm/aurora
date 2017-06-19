const exec = require('child_process').exec;
var util = require('util');
var Cache = require('../caches');
var ulimit_file_size_template = "ulimit -f %s;";
var ulimit_stack_size_template = "ulimit -s %s;";
function execute(lang, space, executable, inputTarget, outputTarget, errorTarget, timeLimit, fileSizeLimit, stackSizeLimit, callback){
	console.log(space);
	var cmd = util.format(ulimit_file_size_template, fileSizeLimit);
	cmd = cmd + util.format(ulimit_stack_size_template, stackSizeLimit);
	var execute_template = Cache.LangsCache.get(lang).execute_template;
	var interpreter = Cache.LangsCache.get(lang).interpreter;
	if(lang == 'JAVA'){
		cmd = cmd + util.format(execute_template, interpreter, space, executable, inputTarget, outputTarget, errorTarget);
	} else {
		cmd = cmd + util.format(execute_template, interpreter, executable, inputTarget, outputTarget, errorTarget);
	}
	var options = {
		encoding: 'utf8',
		shell: '/bin/bash',
		timeout: timeLimit * 1000,
		killSignal: 'SIGKILL',
		env: null
	}
	console.log(cmd);
	var log = {};
	var startTime = process.hrtime();
	var child = exec(cmd, options, function (error, stdout, stderr){
		var totalTime = process.hrtime(startTime);
		log.exitCode = child.exitCode;
		log.totalTime = totalTime[0] + totalTime[1] / 1000000000;
		if(error){
			if(error.killed && error.signal === 'SIGKILL' && error.code === null){
				log.exitCode = 256;
				log.VERDICT = log.DISPLAY_VERDICT = 'TLE';
				return callback(log);
			} else if(log.exitCode === 136){
				log.VERDICT = 'SIGFPE';
				log.DISPLAY_VERDICT = 'RTE(SIGFPE)';
				return callback(log);
			} else if(log.exitCode === 139){
				log.VERDICT = 'SIGSEGV';
				log.DISPLAY_VERDICT = 'RTE(SIGSEGV)';
				return callback(log);
			} else if(log.exitCode === 153){
				log.VERDICT = 'SIGXFSZ';
				log.DISPLAY_VERDICT = 'RTE(SIGXFSZ)';
				return callback(log);
			} else if(log.exitCode == 134){
				log.VERDICT = 'SIGABRT';
				log.DISPLAY_VERDICT = 'RTE(SIGABRT)';
				return callback(log);
			} else{
				log.VERDICT = 'NZEC';
				log.DISPLAY_VERDICT = 'RTE(NZEC)';
				return callback(log);
			}
		} else {
			return callback(log);
		}
	});
}


module.exports = execute;