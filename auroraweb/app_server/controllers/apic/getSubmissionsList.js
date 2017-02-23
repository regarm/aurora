var db = require('auroradb');
var formidable = require('formidable');
module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		if(err) return next(err);
		var filter = {};
		if(req.params.problemCode) filter.problemCode = req.params.problemCode;
		if(req.params.contestCode) filter.contestCode = req.params.contestCode;
		if(fields.handle) filter.handle = fields.handle;
		db.submission.submissionsList(filter, function (err, submissionsList){
			if(err) return next(err);
			res.send({success: true, submissionsList: submissionsList});
		})
	})
};