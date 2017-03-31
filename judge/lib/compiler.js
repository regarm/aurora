var path = require('path');
const exec = require('child_process').exec;


function compile(data, cb){
	var cmd = "g++ " + path.join('submission', data.submission.submissionId + '.cpp') + " -o " + path.join('submission', data.submission.submissionId);
	var options = {
		cwd: path.join(__dirname, 'runtime'),
		encoding: 'utf8',
		shell: '/bin/bash',
		env: null
	}
	console.log(cmd);
	var child = exec(cmd, options, function (error, stdout, stderr){
		if(stderr){
			var err = new Error('COMPILATION_ERROR');
			data.COMPILATION_ERROR = true;
			data.COMPILATION_ERROR_VAL = stderr;
			return cb(err);
		} else {
			if (error) {
				console.error(`exec error: ${error}`);
				return cb(error);
			}
			data.COMPILE_ERROR = false;
			console.log('Compilation successfull');
			return cb(null);
		}
	});

}

module.exports.compile = compile