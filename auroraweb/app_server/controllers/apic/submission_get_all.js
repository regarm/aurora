var db = require('auroradb');
module.exports = function(req, res, next){
	var filter;
	if(req.query.where){
		filter = JSON.parse(req.query.where);
		filter.problemCode = req.params.problemCode;
		filter.contestCode = req.params.contestCode;
	} else {
		filter = {};
		filter.problemCode = req.params.problemCode;
		filter.contestCode = req.params.contestCode;
	}
	db.submission.submissions_get_all(filter, function (err, submissions){
		if(err) return next(err);
		res.send(submissions);
	})
};