var path = require('path');
const exec = require('child_process').exec;
var conf = require('../../conf');
var async = require('async');
var Cache = require('../caches');
var util = require('util');
var fs = require('fs');


function compile(lang, space, sourceTarget, exeTarget, callback){
	var compile_template = Cache.LangsCache.get(lang).compile_template;
	if(compile_template === null || compile_template === undefined || typeof compile_template !== 'string'){
		//May be language does not have a compiler
		return callback({});
	}
	var cmd = '';
	if(lang === 'JAVA'){
		cmd = util.format(compile_template, space, sourceTarget);
	} else {
		cmd = util.format(compile_template, sourceTarget, exeTarget);
	}
	var options = {
		encoding: 'utf8',
		shell: '/bin/bash',
		env: null
	}
	console.log(cmd);
	var log = {};
	var child = exec(cmd, options, function (error, stdout, stderr){
		if(lang === "Pascal"){
			//fpc prints a general message all time and didn't found a way to disable it.
			//fpc prints compilation error messages also in stdout with general message
			//fpc prints compilation warnings in stderr.
			fs.open(exeTarget , 'wx', function(err, fd){
			    if (err && err.code === 'EEXIST'){
			    	return callback(log);
			    } else {
			    	log.VERDICT = 'CE';
					log.DISPLAY_VERDICT = "COMPILATION EROOR";
					log.exitCode = 256;
					if(stderr){
						log.DEBUG = stderr.split(conf.runtime_dir).join('');
			    		fs.close(fd, function(){});
						return callback(log);
					} else {
						log.DEBUG = error.split(conf.runtime_dir).join('');
						fs.close(fd, function(){});
						return callback(log);
					}
			    }
			});
		} else {
			if(error || stderr){
				log.VERDICT = 'CE';
				log.DISPLAY_VERDICT = "COMPILATION EROOR";
				log.exitCode = 256;
				if(stderr){
					log.DEBUG = stderr.split(conf.runtime_dir).join('');
					return callback(log);
				} else {
					log.DEBUG = error.split(conf.runtime_dir).join('');
					return callback(log);
				}
			} else {
				return callback(log);
			}
		}
	});
}
module.exports = compile;