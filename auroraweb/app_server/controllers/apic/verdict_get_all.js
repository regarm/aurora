var db = require('auroradb');
module.exports = function(req, res, next){
	db.setting.verdict_get_all(function (err, value){
		if(err) return next(err);
		res.send(value);
	})
};