var db = require('auroradb');
module.exports = function(req, res, next){
	db.problem.problem_get_one({contestCode: req.params.contestCode, problemCode: req.params.problemCode}, function (err, problem){
		if(err) return next(err);
		res.send(problem);
	})
};