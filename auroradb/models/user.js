var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	// registerUser: function registerUser(reg, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err){
	// 			return cb(err);
	// 		} else {
	// 			var userDetails = {};
	// 			var teamDetails = {};
	// 			userDetails.name = reg.name;
	// 			userDetails.ph = reg.ph;
	// 			userDetails.email = reg.email;
	// 			db.collection('user').insertOne(userDetails, function(err, docUser){
	// 				if(err){
	// 					return cb(err);
	// 				} else {
	// 					// teamDetails.handle = reg.handle;
	// 					// teamDetails.password = reg.password;
	// 					// teamDetails.access = 'normal';
	// 					// teamDetails.members = [];
	// 					// teamDetails.members.push(new ObjectId(docUser.insertedId));
	// 					// require('./team').registerTeam(teamDetails, function(err, docTeam){
	// 					// 	if(err){
	// 					// 		async.series([
	// 					// 			function (cb1){db.collection('users').deleteOne({_id: docUser.insertedId}, function(err){return cb1(err)});}
	// 					// 		],
	// 					// 		function (err1){
	// 					// 			return cb(err);
	// 					// 		});
	// 					// 	} else {
	// 					// 		return cb(null, docTeam);
	// 					// 	}
	// 					// });
	// 					cb(null);
	// 				}
	// 			});
	// 		}
	// 	})
	// },
	handleExistance: function handleExistance(handle, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('user').findOne({handle: handle}, function (err, document){
				if(err) return cb(err);
				if(document) return cb(null, true);
				return cb(null, false);
			})
		})
	},
	login: function login(data, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('user').findOne(data, function (err, document){
				if(err) return cb(err);
				return cb(null, document);
			})
		})
	}
}