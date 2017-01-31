var db = require('auroradb');
module.exports = function(req, res, next){
	db.problem.problemExistance({contestCode: req.params.contestCode, problemCode: req.params.problemCode}, function (err, exists){
		if(err) return next(err);
		if(exists)
			next();
		else {
			var err = new Error('Problem not Found!');
			err.status = 404;
			next(err);
		}
	})
};