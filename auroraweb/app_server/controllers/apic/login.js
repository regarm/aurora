var formidable = require('formidable');
var db = require('auroradb');
module.exports = function(req, res, next){
	var ret = {};
	ret.authorize = {};
	if(req.session.authorize && req.session.authorize.loggedIn){
		ret.msg = "Already logged in.";
		ret.msgType = "warning";
		return res.send(ret);
	}
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files){
		if(err) return next(err);
		db.user.login({handle: fields.handle, password: fields.password}, function (err, document){
			if(err) return next(err);
			ret.authorize.loggedIn = (document != null);
			console.log(document);
			if(document) {
				ret.msg = "Successfully logged in.";
				ret.msgType = "success";
				ret.authorize.handle = document.handle;
				ret.authorize.email = document.email;
				ret.authorize.isTeam = document.isTeam;
				ret.authorize.name = document.name;
			}
			else {
				ret.msg = "Invalid Credentials.";
				ret.msgType = "warning";
			}
			req.session.authorize = ret.authorize;
			res.send(ret);
		})
		
	});
};