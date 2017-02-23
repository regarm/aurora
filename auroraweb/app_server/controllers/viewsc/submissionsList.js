module.exports = function(req, res, next){
	res.locals.title = 'Submissions';
	res.render('submissionsList');
};