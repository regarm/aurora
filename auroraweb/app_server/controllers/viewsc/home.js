module.exports = function(req, res, next){
	res.locals.title = "Home page";
	res.render('home');
};