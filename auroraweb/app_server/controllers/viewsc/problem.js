module.exports = function(req, res, next){
	res.locals.contestCode = req.params.contestCode;
	res.locals.problemCode = req.params.problemCode;
	res.locals.title = res.locals.problemCode + ' | ' + res.locals.contestCode;
	res.render('problem');
};