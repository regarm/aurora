module.exports = function(req, res, next){
	res.locals.title = 'RUN';
	res.render('run');
};