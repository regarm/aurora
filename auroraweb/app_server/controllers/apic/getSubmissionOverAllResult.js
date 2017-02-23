var db = require('auroradb');
module.exports = function(req, res, next){
	db.submission.getOverAllResult({submissionId: req.params.submissionId, contestCode: req.params.contestCode, problemCode: req.params.problemCode}, function (err, overAllResult){
		if(err) return next(err);
		res.send({success: true, overAllResult: overAllResult});
	})
};