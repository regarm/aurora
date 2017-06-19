function demo(){

	//private shared(static) variable
	x = 0;

	//private not shared variable
	var y = 0;

	//public not shared variable
	this.z = 0;
}

function async(){


	async.parallel([
	    function(){ ... },
	    function(){ ... }
	], callback);

	async.series([
	    function(){ ... },
	    function(){ ... }
	]);
	
}

//pstree -aclp
module.exports = demo;



// Current
// Verdicts
// Compilation Error
// *
// Time Limit Exceeded
// Run Time Error
// Internal Error
// *
// Wrong Answer
// Accepted

// Goal
// Verdicts
// Compilation Error
// *
// Time Limit Exceeded
// Run Time Error
//	SIGSEGV - 139
//	NZEC
//	SIGABRT - 134
//	OTHER
//	SIGFPE - 136
// Internal Error
// Wrong Answer
// Accepted
// Presentation Error

//sol 127
//input 1
//

// ulimit

// https://www.toptal.com/nodejs/debugging-memory-leaks-node-js-applications