var db = require('auroradb');
module.exports = function(req, res, next){
	var contestCode = req.params.contestCode;
	var problemCode = req.params.problemCode;
	db.problem.problemTasks({contestCode: req.params.contestCode, problemCode: problemCode}, function (err, tasks){
		if(err) return next(err);
		res.send(tasks);
	})
};