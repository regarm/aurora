var path = require('path');
const exec = require('child_process').exec;
var conf = require('../conf');

function compile(item, log, cb){
	var cmd = "g++ " + path.join(conf.runtime_dir, '/submission', item.submissionId + '.cpp') + " -o " + path.join(conf.runtime_dir, '/submission', item.submissionId);
	var options = {
		cwd: path.join(__dirname, '..', conf.runtime_dir),
		encoding: 'utf8',
		shell: '/bin/bash',
		env: null
	}
	console.log(cmd);
	console.log(options);
	var child = exec(cmd, options, function (error, stdout, stderr){
		if(error){
			log.JUDGE_ERROR = true;
			log.JUDGE_ERROR_VAL = 'Unknown error occured on judge while compiling';
			console.log(error);
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