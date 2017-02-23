var db = require('auroradb');
module.exports = function(req, res, next){
	db.io.fetchFile({fileId: req.params.fileId}, function (err, value){
		if(err) return next(err);
		res.send({success:true, value: value});
	})
};