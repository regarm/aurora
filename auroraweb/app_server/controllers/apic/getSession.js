module.exports = function(req, res, next){
	if(!req.session.authorize) req.session.authorize = {};
	res.send(req.session.authorize);
};