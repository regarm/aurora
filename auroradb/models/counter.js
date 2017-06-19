var MongoPool = require('../mongopool.js');
var async = require('async');

exports = module.exports = {
	counter_get_one: function counter_get_one(name, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('counter').findAndModify({ _id: name }, null, { $inc: { value: 1 } }, {new:true}, function (err, document){
				if(err) return cb(err);
				if(document.ok == 0) return cb(new Error('Unknown error occured.'));
				return cb(null, document.value);
			})
		})
	}	
}