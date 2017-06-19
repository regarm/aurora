var formidable = require('formidable');
var db = require('auroradb');
module.exports = function(req, res, next){
	if(req.session.authorize && req.session.authorize.loggedIn){
		return res.sendStatus(400); res.send('Already logged in.');
	}
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		if(err) return next(err);
		db.user.login({handle: fields.handle, password: fields.password}, function (err, document){
			if(err) return next(err);
			req.session.authorize = {};
			if(document) {
				req.session.authorize.loggedIn = true;
				req.session.authorize.handle = document.handle;
				req.session.authorize.email = document.email;
				req.session.authorize.isTeam = document.isTeam;
				req.session.authorize.name = document.name;
				res.sendStatus(200);
			}
			else {
				res.sendStatus(401);
			}
		})
		
	});
};