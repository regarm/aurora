function demo(){

	//private shared(static) variable
	x = 0;

	//private not shared variable
	var y = 0;

	//public not shared variable
	this.z = 0;
}

module.exports = demo;