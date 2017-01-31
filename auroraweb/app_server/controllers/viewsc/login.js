module.exports = function(req, res, next){
	res.locals.title = "Log In";
	res.render('login');
};