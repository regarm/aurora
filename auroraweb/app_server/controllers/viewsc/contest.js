module.exports = function(req, res, next){
	res.locals.contestCode = req.params.contestCode;
	res.locals.title = res.locals.contestCode;
	res.render('contest');
};