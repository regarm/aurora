var api = require('./api');
var async = require('async');


var data = new Map();
/*
data contains problem cache map
key : {problemCode, contestCode}
value : {tasks}
*/

function add(problem, cb){
	if(problem && problem.problemCode && problem.contestCode){
		var key = {problemCode: problem.problemCode, contestCode: problem.contestCode};
		var value = {};
		if(data.has(JSON.stringify(key))) return cb(null);

		async.series([
			function (cb){
				api.fetchProblemTasks(key, function(err, tasks){
					if(err) return cb(err);
					value.tasks = tasks;
					cb(null);
				})
			},
			function (cb){
				api.fetchTask(value.tasks, cb);
			}
		], function (err){
			if(err){
				return cb(err);
			}
			data.set(JSON.stringify(key), value);
			cb(null);
		});
	} else {
		return cb(new Error('Given data is not sufficient to add problem: ' + JSON.stringify(problem)));
	}
}

function remove(problem){
	if(problem && problem.problemCode && problem.contestCode){
		var key = {problemCode: problem.problemCode, contestCode: problem.contestCode};
		data.delete(JSON.stringify(key));
	}
}

function has(problem, cb){
	if(problem && problem.problemCode && problem.contestCode){
		var key = {problemCode: problem.problemCode, contestCode: problem.contestCode};
		cb(null, data.has(JSON.stringify(key)));
	} else {
		cb(null, false);
	}
}

add({
		contestCode: "PRACTICE",
		problemCode: "TEST"
	}, function (err, res){
		console.log('err ' + err);
		console.log('res ' + res);
		for (var [key, value] of data.entries()) {
		  console.log(key);
		  console.log(value);
		}
})