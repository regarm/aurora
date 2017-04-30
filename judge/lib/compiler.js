var path = require('path');
const exec = require('child_process').exec;

function compile(item, log, cb){
	var cmd = "g++ " + path.join('../runtime/submission', item.submissionId + '.cpp') + " -o " + path.join('../runtime/submission', item.submissionId);
	var options = {
		cwd: path.join(__dirname, '../runtime'),
		encoding: 'utf8',
		shell: '/bin/bash',
		env: null
	}
	var child = exec(cmd, options, function (error, stdout, stderr){
		if(error){
			log.JUDGE_ERROR = true;
			log.JUDGE_ERROR_VAL = 'Unknown error occured on judge while compiling';
			cb(new Error(log.JUDGE_ERROR_VAL));
		} else {
			if(stderr){
				log.COMPILATION_ERROR = true;
				log.COMPILATION_ERROR_VAL = stderr;
				return cb(new Error(COMPILATION_ERROR_VAL));
			} else {
				item.COMPILE_ERROR = false;
				return cb(null);
			}
		}
	});
}

module.exports.compile = compile;