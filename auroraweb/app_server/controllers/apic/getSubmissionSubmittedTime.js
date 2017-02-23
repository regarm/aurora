var db = require('auroradb');
module.exports = function(req, res, next){
	db.submission.getSubmittedTime({submissionId: req.params.submissionId, contestCode: req.params.contestCode, problemCode: req.params.problemCode}, function (err, submitted){
		if(err) return next(err);
		res.send({success: true, submitted: submitted});
	})
};