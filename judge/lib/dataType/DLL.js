//Doubly Linked List
//
//
//* * * * * *
//	1. [prepend(node)](#prepend)
//	2. [append(node)](#append)
//	3. [front()](#front)
//	4. [back()](#back)
//	5. [pop_front()](#pop_front)
//	6. [pop_back()](#pop_back)
//	7. [empty()](#empty)
//* * * * * *

//
function DLL(){
	var self = this;
	self.head = null;
	self.tail = null;
	self.length = 0;



	//Set a initial node in `DLL`
	var setInitial = function setInitial(node){
		self.length = 1;
		var record = {value: node, DLLPrevNode: null, DLLNextNode: null};
		self.head = self.tail = record;
	}

	//Set `DLL` Empty
	var setEmpty = function setEmpty(){
		self.length = 0;
		self.head = self.tail = null;
	}










	//Prepends node in the front of the `DLL`
	//<a name="prepend"></a>
	self.prepend = function prepend(node){
		if(self.empty()){
			setInitial(node);
		} else {
			var record = {value: node, DLLPrevNode: null, DLLNextNode: null};
			record.DLLNextNode = self.head;
			self.head.DLLPrevNode = record;
			self.head = record;
			self.length += 1;
		}
	}

	//Appends node in the back of the `DLL` 
	//<a name="append"></a>
	self.append = function append(node){
		if(self.empty()){
			setInitial(node);
		} else {
			var record = {value: node, DLLPrevNode: null, DLLNextNode: null};
			record.DLLPrevNode = self.tail;
			self.tail.DLLNextNode = record;
			self.tail = record;
			self.length += 1;
		}
	}

	//Returns the front node in `DLL`
	//<a name="front"></a>
	self.front = function front(node){
		if(self.empty()){
			return null;
		} else {
			return self.head.value;
		}
	}

	//Returns the node in the back of the `DLL`
	//<a name="back"></a>
	self.back = function back(node){
		if(self.empty()){
			return null;
		} else {
			return self.tail.value;
		}
	}

	//Remove the node in the front from the `DLL`
	//<a name="pop_front"></a>
	self.pop_front = function pop_front(node){
		if(!self.empty()){
			if(self.head.DLLNextNode){
				self.head.DLLNextNode.DLLPrevNode = null;
			}
			var storeNewHead = self.head.DLLNextNode;
			delete self.head;
			self.head = storeNewHead;
			self.length -= 1;
			if(self.empty()){
				setEmpty();
			}
		}
	}

	//Remove the node in the back from the `DLL`
	//<a name="pop_back"></a>
	self.pop_back = function pop_back(node){
		if(!self.empty()){
			if(self.tail.DLLPrevNode){
				self.tail.DLLPrevNode.DLLNextNode = null;
			}
			var storeNewTail = self.tail.DLLPrevNode;
			delete self.tail;
			self.tail = storeNewTail;
			self.length -= 1;
			if(self.empty()){
				self.setEmpty();
			}
		}
	}
	//Check if `DLL` is empty
	//<a name="empty"></a>
	self.empty = function empty(){
		return (self.length === 0);
	}
}
module.exports = DLL;