var db = require('auroradb');
module.exports = function(req, res, next){
	db.counter.counter_get_one('counter', function (err, counter){
		if(err) return next(err);
		res.send(counter);
	})
};