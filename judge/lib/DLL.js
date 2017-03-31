//Doubly Linked List

function DLL(){
	//Head of `DLL`
	this.head = null;
	//Tail of `DLL`
	this.tail = null;
	//Length of `DLL`
	this.length = 0;


	//Set a single node in `DLL`
	this.setInitial = function setInitial(node){
		this.length = 1;
		node.DLLPrevNode = node.DLLNextNode = null;
		this.head = this.tail = node;
	}

	//Set `DLL` Empty
	this.setEmpty = function setEmpty(){
		this.length = 0;
		this.head = this.tail = null;
	}

	//Check if `DLL` is empty
	this.empty = function empty(){
		return (this.length === 0);
	}


	//Return a copy of parameter excluding `DLLPrevNode` and `DLLNextNode` attributes.
	this.filtered = function filtered(node){
		var store = {};
		store.DLLNextNode = node.DLLNextNode;
		store.DLLPrevNode = node.DLLPrevNode;
		node.DLLNextNode = node.DLLPrevNode = null;
		var ret = JSON.parse(JSON.stringify(node)); //deep copy the item
		delete ret.DLLPrevNode;
		delete ret.DLLNextNode;
		node.DLLNextNode = store.DLLNextNode;
		node.DLLPrevNode = store.DLLPrevNode;
		return ret;
	}

	//Appends node in the back of the `DLL`
	this.append = function append(node){
		node.DLLNextNode = node.DLLPrevNode = null;
		if(this.empty()){
			this.setInitial(node);
		} else {
			node.DLLPrevNode = this.tail;
			this.tail.DLLNextNode = node;
			this.tail = node;
			this.length += 1;
		}
	}

	//Returns the front node in `DLL`
	this.front = function front(node){
		if(this.head){
			return this.filtered(this.head);
		} else {
			return null;
		}
	}

	//Returns the node in the back of the `DLL`
	this.back = function back(node){
		if(this.tail){
			return this.filtered(this.tail);
		} else {
			return null;
		}
	}

	//Remove the node in the front from the `DLL`
	this.pop_front = function pop_front(node){
		if(this.head){
			if(this.head.DLLNextNode){
				this.head.DLLNextNode.DLLPrevNode = null;
			}
			this.head = this.head.DLLNextNode;
			this.length -= 1;
			if(this.empty()){
				this.setEmpty();
			}
		}
	}

	//Remove the node in the back from the `DLL`
	this.pop_back = function pop_back(node){
		if(this.tail){
			if(this.tail.DLLPrevNode){
				this.tail.DLLPrevNode.DLLNextNode = null;
			}
			this.tail = this.tail.DLLPrevNode;
			this.length -= 1;
			if(this.empty()){
				this.setEmpty();
			}
		}
	}
}
module.exports = DLL;