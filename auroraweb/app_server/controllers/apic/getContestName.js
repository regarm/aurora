var db = require('auroradb');
module.exports = function(req, res, next){
	db.contest.contestName({contestCode: req.params.contestCode}, function (err, contestName){
		if(err) return next(err);
		res.send({contestName: contestName});
	})
};