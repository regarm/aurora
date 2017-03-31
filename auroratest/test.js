// var db = require('auroradb');
// db.problem.problemName('TEST', function (err, document) {
// 	console.log(err);
// 	console.log(document);
// })

var request = require('request');

request.post({url: 'http://127.0.0.1:5000/api/fetchFile/58b9db32dd221c0cb0f69ba4'}, function (err, res, body){
	console.log(err);
	console.log(body);
});