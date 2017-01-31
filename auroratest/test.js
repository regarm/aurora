// var db = require('auroradb');
// db.problem.problemName('TEST', function (err, document) {
// 	console.log(err);
// 	console.log(document);
// })

var request = require('request');

request.post({url: 'http://127.0.0.1:3000/api/jdfhf/contestExistance'}, function (err, res, body){
	console.log(err);
	console.log(body);
});