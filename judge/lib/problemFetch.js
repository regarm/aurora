var async = require('async');
var api = require('./api');


function problemFetch(problem, cb){
	console.log('fetching problem');
	async.series([
		function (callback){
			api.fetchProblemTasks(problem, function (err, response){
				if(err){
					return callback(err);
				} else {
					problem.tasks = response;
					callback(null);
				}
			});
		},
		function (callback){
			api.fetchTask(problem.tasks, function (err){
				if(err){
					return callback(err);
				} else {
					callback(null);
				}
			})
		}
	], function (err){
		if(err){
			console.log(err);
		} else {
			return cb();
		}
	})
}

module.exports = problemFetch;