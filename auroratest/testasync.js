var async = require('async');

function one(item, callback){
	console.log(item);
	if(item < 3){
		setTimeout(function () {
			console.log('hi delay item' + item);
			callback();
		}, 2000);
	} else {
		callback(new Error('kdfj' + item));
	}
}

var tr = [1, 2, 3, 4];

async.each(tr, one, function (err) {
	if(err) {
		console.log('hi err');
	} else {
		console.log('hi non err');
	}
})
