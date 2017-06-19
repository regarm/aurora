var db = require('auroradb');
var formidable = require('formidable');
module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		var updateSet = {};
		for(var key in fields){
			if(key !== 'name'){
				updateSet[key] = fields[key];
			}
		}
		db.lang.lang_update_one(req.params.name, updateSet, function (err){
			if(err) return next(err);
			res.send();
		})
	})
};