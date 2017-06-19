module.exports = function(req, res, next){
	res.locals.title = 'Aurora Settings';
	res.render('setting');
};