var db = require('auroradb');
module.exports = function(req, res, next){
	db.submission.solution({submissionId: req.params.submissionId}, function (err, solution){
		if(err) return next(err);
		res.send({success: true, solution: solution});
	})
};