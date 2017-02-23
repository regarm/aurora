var db = require('auroradb');
module.exports = function(req, res, next){
	db.submission.submissionExistance({contestCode: req.params.contestCode, problemCode: req.params.problemCode, submissionId: req.params.submissionId}, function (err, exists){
		if(err) return next(err);
		if(exists)
			next();
		else {
			var err = new Error('Submission not Found!');
			err.status = 404;
			next(err);
		}
	})
};