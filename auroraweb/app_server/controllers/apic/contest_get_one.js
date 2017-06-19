var db = require('auroradb');
module.exports = function(req, res, next){
	db.contest.contest_get_one(req.params.contestCode, function (err, contest){
		if(err) return next(err);
		res.send(contest);
	})
};