var db = require('auroradb');
module.exports = function(req, res, next){
	db.file.file_get_one({fileId: req.params.fileId}, function (err, value){
		if(err) return next(err);
		res.send(value);
	})
};