var db = require('auroradb');
module.exports = function(req, res, next){
	db.contest.contestList(function (err, contestList){
		if(err) return next(err);
		res.send({success: true, contestList: contestList});
	})
};