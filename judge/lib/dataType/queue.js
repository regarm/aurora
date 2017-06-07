//Task Executing Queue
//
//
//* * * * * *
//	1. [enqueue(item)](#enqueue)
//	2. [running()](#running)
//	3. [pause()](#pause)
//	4. [resume()](#resume)
//	5. [idle()](#idle)
//* * * * * *



//
function Queue(param_task, concurrency){
	if(typeof param_task !== 'function'){
		throw new Error('Queue constructor received a non-function type task.')
	}

	var self = this;
	//Queue Store using `DLL`
	var store = new (require('./DLL'))();
	//Task Executed on each item
	var task = param_task;
	//Concurrency of workers
	var conc = concurrency;

	//Check if queue is empty
	var empty = function empty(){
		return store.empty();
	}

	//Get candidate element from queue.
	var front = function front(){
		return store.front();
	}

	//Delete candidate element from queue.
	var pop_front = function pop_front(){
		store.pop_front();
	}





	//Add an item in queue.
	//<a name="enqueue"></a>
	self.enqueue = function enqueue(item){
		store.append(item);
		setImmediate(processItem.bind(self));
	}







	// Queue task processing.
	var workers = 0;
	var paused = false;

	//Process the task
	var processItem = function processItem(){
		while((!paused) && workers < conc && (!empty())){
			workers += 1;
			var item = front();
			pop_front();
			task(item, endWorker.bind(self));
		}
	}
	
	//End a worker
	var endWorker = function endWorker(err){
		if(err){
			throw err;
		}
		workers -= 1;
		setImmediate(processItem.bind(self));
	}





	//Running queue
	//<a name="running"></a>
	self.running = function running(){
		return workers;
	}

	//Pause queue
	//<a name="pause"></a>
	self.pause = function pause(){
		paused = true;
	}

	//Resume queue
	//<a name="resume"></a>
	self.resume = function resume(){
		if(paused){
			paused = false;
			setImmediate(processItem.bind(self));
		}
	}

	//Idle queue
	//<a name="idle"></a>
	self.idle = function idle(){
		return (workers === 0);
	}
}
module.exports = Queue;