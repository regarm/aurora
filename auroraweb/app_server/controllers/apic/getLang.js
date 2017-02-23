var db = require('auroradb');
module.exports = function(req, res, next){
	db.lang.getLang({langId: req.params.langId}, function (err, lang){
		if(err) return next(err);
		res.send({success: true, lang: lang});
	})
};