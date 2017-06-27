var services = require('./lib/services');
var process = require('process');

services.LangService.query(function (err){
	if(err){
		console.log(err);
		process.exit();
	}
})
