module.exports = function(req, res, next){
	res.locals.contestCode = req.params.contestCode;
	res.locals.problemCode = req.params.problemCode;
	res.locals.submissionId = req.params.submissionId;
	res.locals.title = 'submission' + ' | ' + res.locals.submissionId;
	res.render('submission');
};