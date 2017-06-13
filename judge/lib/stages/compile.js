var path = require('path');
const exec = require('child_process').exec;
var conf = require('../../conf');
var async = require('async');

function compile(compiler, sourceTarget, exeTarget, callback){
	var cmd = compiler + " " +  sourceTarget + " -o " + exeTarget ;
	var options = {
		encoding: 'utf8',
		shell: '/bin/bash',
		env: null
	}
	var log = {};
	var child = exec(cmd, options, function (error, stdout, stderr){
		if(error || stderr){
			log.VERDICT = 'CE';
			log.exitCode = 256;
			if(stderr){
				log.ERROR_VAL = stderr.split(conf.runtime_dir).join('');
				return callback(log);
			} else {
				log.ERROR_VAL = error.split(conf.runtime_dir).join('');
				return callback(log);
			}
		} else {
			return callback(log);
		}
	});
}

module.exports = compile;