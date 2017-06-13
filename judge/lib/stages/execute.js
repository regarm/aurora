const exec = require('child_process').exec;
function execute(interpreter, executable, inputTarget, outputTarget, errorTarget, timeLimit, callback){
	var cmd = "ulimit -s 16384 -f 131072; " + interpreter + " " + executable + " < " + inputTarget + " > " + outputTarget + " 2> " + errorTarget;
	var options = {
		encoding: 'utf8',
		shell: '/bin/bash',
		timeout: timeLimit * 1000,
		killSignal: 'SIGKILL',
		env: null
	}
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
			} else {
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

// var interpreter = "";
// var executable = "/home/butterfly/test/sol";
// var inputTarget = "/home/butterfly/test/input.txt";
// var outputTarget = "/home/butterfly/test/output.txt";
// var errorTarget = "/home/butterfly/test/error.txt";
// var timeLimit = 10;
// execute(interpreter, executable, inputTarget, outputTarget, errorTarget, timeLimit, function (err, log){
// 	console.log(err);
// 	console.log(log);
// })