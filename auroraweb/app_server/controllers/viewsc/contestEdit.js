module.exports = function(req, res, next){
	res.locals.contestCode = req.params.contestCode;
	res.locals.title = 'Edit Contest | ' + res.locals.contestCode;
	res.render('contestEdit');
};