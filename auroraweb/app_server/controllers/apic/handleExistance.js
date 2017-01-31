var formidable = require('formidable');
var db = require('auroradb');
module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		if(err) return next(err);
		db.user.handleExistance(fields.handle, function (err, exists){
			if(err) return next(err);
			res.send({exists: exists});
		})
		
	});
};