var db = require('auroradb');
module.exports = function(req, res, next){
	var contestCode = req.params.contestCode;
	db.contest.getContestEndTimes({contestCode: contestCode}, function (err, endTimes){
		if(err) return next(err);
		res.send({success: true, endTimes});
	})
};