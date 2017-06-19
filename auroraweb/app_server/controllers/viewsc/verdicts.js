module.exports = function(req, res, next){
	res.locals.title = 'VERDICTS | EXIT CODES';
	res.render('verdicts');
};