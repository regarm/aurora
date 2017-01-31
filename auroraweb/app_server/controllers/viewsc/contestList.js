module.exports = function(req, res, next){
	res.locals.title = 'Contests';
	res.render('contestList');
};