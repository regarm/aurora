var db = require('auroradb');
module.exports = function(req, res, next){
	db.lang.getLangs(function (err, langs){
		if(err) return next(err);
		res.send(langs);
	})
};