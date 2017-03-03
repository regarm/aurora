var db = require('auroradb');
var formidable = require('formidable');
module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		db.problem.updateProblemTasks({problemCode: req.params.problemCode, contestCode: req.params.contestCode, tasks: fields.tasks}, function (err){
			if(err) return next(err);
			res.send();
		})
	})
};