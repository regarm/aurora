var db = require('auroradb');
module.exports = function(req, res, next){
	db.problem.problemName({problemCode: req.params.problemCode}, function (err, problemName){
		if(err) return next(err);
		res.send({problemName: problemName});
	})
};