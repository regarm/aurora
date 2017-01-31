var db = require('auroradb');
module.exports = function(req, res, next){
	db.contest.contestExistance(req.params.contestCode, function (err, exists){
		if(err) return next(err);
		if(exists)
			next();
		else {
			var err = new Error('Contest not Found!');
			err.status = 404;
			next(err);
		}
	})
};