var fs = require('fs');
var formidable = require('formidable');
var db = require('auroradb');
module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	form.multiples = false;
	form.parse(req, function (err, fields, files){
		if(err) return next(err);
		fs.readFile(files.file.path, "utf-8", function (err, data){
			if(err) return next(err);
			db.file.file_upload_one(data, function (err, doc){
				if(err) return next(err);
				return res.send({fileId: doc.insertedId});
			})
		})
	});
};