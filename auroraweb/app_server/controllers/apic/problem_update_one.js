var db = require('auroradb');
var formidable = require('formidable');
module.exports = function(req, res, next){
	
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		var updateSet = {};
		for(var key in fields){
			if(key !== 'problemCode' && key !== 'contestCode'){
				updateSet[key] = fields[key];
			}
		}
		db.problem.problem_update_one({problemCode: req.params.problemCode, contestCode: req.params.contestCode}, updateSet, function (err){
			if(err) return next(err);
			res.send();
		})
	})
};