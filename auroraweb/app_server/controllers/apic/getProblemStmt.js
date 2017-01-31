var db = require('auroradb');
module.exports = function(req, res, next){
	db.problem.problemStmt({problemCode: req.params.problemCode}, function (err, problemStmt){
		if(err) return next(err);
		res.send({problemStmt: problemStmt});
	})
};