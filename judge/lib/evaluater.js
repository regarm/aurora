function fakeevaluter(item, log, cb){
	console.log('Evaluating');
	cb();
}

module.exports.evaluate = fakeevaluter;