var db = require('auroradb');
module.exports = function(req, res, next){
	db.contest.contestExistance(req.params.contestCode, function (err, exists){
		if(err) return next(err);
		res.send({exists: exists});
	})
};