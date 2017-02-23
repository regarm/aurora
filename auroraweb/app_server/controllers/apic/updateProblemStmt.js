var db = require('auroradb');
var formidable = require('formidable');
module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		db.problem.updateProblemStmt({problemCode: req.params.problemCode, contestCode: req.params.contestCode, problemStmt: fields.problemStmt}, function (err){
			if(err) return next(err);
			setTimeout(function (){
				res.send();
			}, 5000);
		})
	})
};