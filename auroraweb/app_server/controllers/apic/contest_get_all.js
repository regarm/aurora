var db = require('auroradb');
module.exports = function(req, res, next){
	db.contest.contest_get_all(function (err, contest_all){
		if(err) return next(err);
		res.send(contest_all);
	})
};