//API needed for judge
//
//
//****************
//	1. [fetchProblemTasks(data, cb)](#fetchProblemTasks)
//			data = {
//			"problemCode" : "---",
//			"contestCode" : "---"
//			}
//	2. [fetchSolution(data, cb)](#fetchSolution)  
//
//			data = {
//			"submissionId" : "---",
//			"problemCode" : "---",
//			"contestCode" : "---"
//			}
//****************



//
var request = require('request');
var conf = require('../conf');
var fs = require('fs');
var path = require('path');
var async = require('async');
var Cache = require('./caches');

function factory(url, method, callback){
	var headers = {
      'Content-Type': 'application/json'
    };
    request({method: method, url: url, headers: headers}, function (err, httpres, body){
    	if(err){
    		return callback(err);
    	}
    	if(httpres.statusCode !== 200){
    		return callback(new Error(url + ' returned ' + httpres.statusCode));
    	} else {
    		try{
    			var response = JSON.parse(body);
    			return callback(null, response);
    		} catch(e){
    			callback(e);
    		}
    	}
    });
}

function fetchAndStoreSubmission(submission, callback){
	var url = conf.api + '/contest/' + submission.contestCode + '/problem/' + submission.problemCode + '/submission/' + submission.submissionId;
	factory(url, 'GET', function (err, response){
		if(err){
			return cb(err);
		} else {
			var source_ext = Cache.LangCache.get(submission.lang).source_ext;
			var dir_name = path.join(conf.runtime_dir, 'submission', submission.submissionId);
			var file_name = 'solution.' + source_ext;
			fs.mkdir(dir_name, function (err){
				if(err && err.code === 'EEXIST'){
					callback(null, response);
				} else if(err){
					callback(err);
				} else {
					fs.writeFile(path.join(dir_name, file_name), response.solution, function (err){
						if(err){
							callback(err);
						} else {
							callback(null, response);
						}
					})
				}
			})
		}
	})
}

function fetchLang(lang, callback){
	var url = conf.api + '/lang/' + lang;
	factory(url, 'GET', function(err, response){
		if(err){
			return callback(err);
		} else {
			callback(null, response);
		}
	})
}

function fetchLangs(callback){
	var url = conf.api + '/lang';
	factory(url, 'GET', function(err, langs){
		if(err){
			return callback(err);
		} else {
			async.each(langs, function(lang, cb){
				fetchLang(lang.name, function(err, lang){
					if(err){
						cb(err);
					} else {
						Cache.LangCache.put(lang.name, lang);
						cb(null);
					}
				})
			}, function (err){
				callback(err);
			});
		}
	})
}


module.exports.fetchLangs = fetchLangs;
// var submission = {
// 	"problemCode" : "TEST",
//     "contestCode" : "PRACTICE",
//     "submissionId" :  "594790d88bf99854c605ad4e"
// }

// fetchAndStoreSubmission(submission, function (err, submission){
// 	console.log(submission);
// })


// function api(){
// 	var self = this;

// 	fetch = function fetch(url, method, cb){
// 		var headers = {
// 	      'Content-Type': 'application/json'
// 	    };
// 	    request({method: method, url: url, headers: headers}, function (err, httpres, body){
// 	    	if(err){
// 	    		return cb(err);
// 	    	}
// 	    	if(httpres.statusCode !== 200){
// 	    		return cb(new Error(url + ' returned ' + httpres.statusCode));
// 	    	} else {
// 	    		return cb(null, JSON.parse(body));
// 	    	}
// 	    });
// 	}

// 	fetchFile = function fetchFile(file, cb){
// 		var url = conf.api + '/fetchFile/' + file;
// 		fetch(url, function (err, response){
// 			if(err){
// 				return cb(err);
// 			} else {
// 				fs.writeFile(path.join(conf.runtime_dir, 'io', file), response.value, function (err){
// 					cb(err);
// 				})
// 			}
// 		})
// 	}

// 	fetchIO = function fetchIO(io, cb){
// 		async.parallel([
// 			function (callback){
// 				fetchFile(io.input, callback);
// 			},
// 			function (callback){
// 				fetchFile(io.output, callback);
// 			}
// 		], function (err){
// 			cb(err);
// 		})
// 	}

// 	fetchSubtask = function fetchSubtask(subtask, cb){
// 		async.each(subtask.io, fetchIO, function (err){
// 			cb(err);
// 		})
// 	}

// 	//<a name="fetchTask" ></a>
// 	fetchTask = function fetchTask(data, cb){
// 		async.each(data, fetchSubtask, function (err){
// 			cb(err);
// 		})
// 	}







// 	//<a name="fetchProblemTasks" ></a>
// 	self.fetchProblemTasks = function fetchProblemTasks(data, cb){
// 		var url = conf.api + '/' + data.contestCode + '/' + data.problemCode + '/getProblemTasks';
// 		fetch(url, function (err, response){
// 			if(err){
// 				return cb(err);
// 			}else {
// 				fetchTask(response, function (err){
// 					if(err){
// 						return cb(err);
// 					} else {
// 						return cb(null, response);
// 					}
// 				})
// 			}
// 		})
// 	}

// 	//<a name="fetchLangs" ></a>
// 	self.fetchLangs = function fetchLangs(cb){
// 		var url = conf.api + '/lang';
// 		fetch(url, 'GET', function(err, response){
// 			if(err){
// 				return cb(err);
// 			} else {
// 				cb(null, response);
// 			}
// 		})
// 	}
	
// 	//<a name="fetchLangs" ></a>
// 	self.fetchLang = function fetchLang(lang, cb){
// 		var url = conf.api + '/lang/' + lang;
// 		fetch(url, 'GET', function(err, response){
// 			if(err){
// 				return cb(err);
// 			} else {
// 				cb(null, response);
// 			}
// 		})
// 	}
// }

// module.exports = api;
