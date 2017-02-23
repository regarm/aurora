var db = require('auroradb');
module.exports = function(req, res, next){
	db.submission.getHandle({submissionId: req.params.submissionId, problemCode: req.params.problemCode, contestCode: req.params.contestCode}, function (err, handle){
		if(err) return next(err);
		res.send({success: true, handle: handle});
	})
};