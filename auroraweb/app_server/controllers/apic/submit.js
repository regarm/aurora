var formidable = require('formidable');
var db = require('auroradb');
module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		if(err) return next(err);
		var submission = {};
		submission.solution = fields.solution;
		submission.problemCode = fields.problemCode;
		submission.contestCode = fields.contestCode;
		submission.lang = fields.lang;
		submission.handle = fields.handle;
		db.submission.submit(submission, function (err, submissionId){
			if(err) return next(err);
			ret = {};
			ret.success = true;
			ret.submissionId = submissionId;
			ret.msg = "Successfully submitted";
			ret.msgType = "success";
			res.send(ret);
		});
	});
};