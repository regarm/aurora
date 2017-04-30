// Queue Data Structure
// Supports existence checking and removing.

//Uses

// ```
// var queue = new Queue( task_fun, keyParameter, concurrency);
// 
// for(var i = 0;i < 100;++i){
// 	queue.enqueue({key: i, data: 32 + i});
// }
//```

var process = require('process');
var noop = function noop(){};

function Queue(param_task, keyParameter, concurrency){
	if(param_task == null) param_task = noop;
	if(typeof param_task !== 'function'){
		process.emitWarning('Queue task callback is not a function, keyParameter: ' + keyParameter);
	}
	if(keyParameter == null){
		throw new Error('Null keyParameter received in queue');
	}




	//Existence check using Javascript [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)
	this.keyMap = new Map();

	//Queue Store using [DLL](DLL.html)
	this.store = new (require('./DLL'))();

	//Task Executed on each item
	this.task = param_task;

	//Add an item in `Queue`

	//@param {string} keyParameter - Attribute of item which defines it's uniqueness

	//@param {Object} item - Item to insert in queue (Should have `keyParamenter` attribute.)
	this.enqueue = function enqueue(item){
		/* Check if keyParameter is defined */
		if(item[keyParameter] !== null){
			/* Ignore if item is already in queue */
			if(!this.keyMap.has(item[keyParameter])){
				var item = JSON.parse(JSON.stringify(item)); /* deep copy the item */
				this.keyMap.set(item[keyParameter], item);
				this.store.append(item);
			}
		} else {
			process.emitWarning('Queue received an item without \'keyParameter\', Ignoring.');
		}
		setImmediate(this.process.bind(this));
	}

	//Check item existence in `Queue`
	this.has = function has(item){
		/* Check if keyParameter is defined */
		if(item[keyParameter] !== null){
			return this.keyMap.has(item[keyParameter]);
		} else {
			process.emitWarning('Queue received an item without \'keyParameter\', Ignoring.');
			return false;
		}
	}

	//Remove item from the `Queue`
	this.dequeue = function remove(item){
		/* Check if keyParameter is defined */
		if(item[keyParameter] !== null){
			/* Remove item from this.keyMap only */
			return this.keyMap.delete(item[keyParameter]);
		} else {
			process.emitWarning('Queue received an item without \'keyParameter\', Ignoring.');
			return false;
		}
	}

	//Check if queue is empty
	this.empty = function empty(){
		return this.store.empty();
	}

	//Get candidate element from queue (this item may or may not be in queue, check `this.keyMap`.)
	this.front = function front(){
		if(this.empty()) return null;
		else {
			return this.store.front();
		}
	}

	//Delete candidate element from queue.
	this.pop_front = function pop_front(){
		if(this.empty()) return false;
		else {
			this.keyMap.delete(this.store.front()[keyParameter]);
			return this.store.pop_front();
		}
	}	


	// Queue task processing.
	this.workers = 0;
	this.singleProcessingLock = false;
	this.paused = false;
	this.concurrency = concurrency;

	//Process the task
	this.process = function process(){
		if(this.singleProcessingLock) return ;
		this.singleProcessingLock = true;
		while((!this.paused) && this.workers < this.concurrency && (!this.empty())){
			this.workers += 1;
			var item = this.front();
			if(this.keyMap.has(item[keyParameter])){
				this.task(item, this.endWorker.bind(this));
			}
			this.pop_front();
		}
		this.singleProcessingLock = false;
	}

	//Running queue
	this.running = function running(){
		return this.workers;
	}

	//Idle queue
	this.idle = function idle(){
		return (this.workers === 0);
	}

	//Pause queue
	this.pause = function pause(){
		this.paused = true;
	}

	//Resume queue
	this.resume = function resume(){
		if(this.paused){
			this.paused = false;
			setImmediate(this.process.bind(this));
		}
	}

	//End a worker
	this.endWorker = function endWorker(){
		this.workers -= 1;
		setImmediate(this.process.bind(this));
	}
}
module.exports = Queue;