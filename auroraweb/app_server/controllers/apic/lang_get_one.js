var db = require('auroradb');
module.exports = function(req, res, next){
	db.lang.lang_get_one(req.params.name, function (err, lang){
		if(err) return next(err);
		res.send(lang);
	})
};