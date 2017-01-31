var db = require('auroradb');
module.exports = function(req, res, next){
	var contestCode = req.params.contestCode;
	db.contest.problemsList({contestCode: contestCode}, function (err, problemsList){
		if(err) return next(err);
		res.send(problemsList);
	})
};