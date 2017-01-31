var db = require('auroradb');
module.exports = function(req, res, next){
	var contestCode = req.params.contestCode;
	var problemCode = req.params.problemCode;
	db.problem.problemScores({problemCode: problemCode}, function (err, scores){
		if(err) return next(err);
		res.send({success: true, scores: scores});
	})
};