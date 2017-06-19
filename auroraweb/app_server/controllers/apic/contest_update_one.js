var db = require('auroradb');
var formidable = require('formidable');
module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		db.contest.contest_update_one({contestCode: req.params.contestCode}, fields, function (err){
			if(err) return next(err);
			res.send();
		})
	})
};