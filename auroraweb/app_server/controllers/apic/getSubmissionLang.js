var db = require('auroradb');
module.exports = function(req, res, next){
	db.submission.getLang({submissionId: req.params.submissionId, contestCode: req.params.contestCode, problemCode: req.params.problemCode}, function (err, lang){
		if(err) return next(err);
		res.send({success: true, lang: lang});
	})
};