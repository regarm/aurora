var db = require('auroradb');
module.exports = function(req, res, next){
	db.submission.submission_get_one(req.params.submissionId, function (err, submission){
		if(err) return next(err);
		res.send(submission);
	})
};