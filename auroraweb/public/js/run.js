aojApp.requires.push('angularScreenfull', 'ui.ace', 'ngWebSocket');
aojApp.controller('RunController', function($scope, $websocket, CodeEditorService){
	$scope.ws = $websocket('ws://localhost:4091');
	$scope.ws.onOpen(function() {
	    console.log('WebSocket connected.');
	});
	$scope.ws.onMessage(function (event) {
	    console.log('Message from server', event.data);
	    var liveIn = JSON.parse(event.data);
	    if(liveIn.type === "status"){
	    	$scope.output = liveIn.data||'';
	    } else if(liveIn.type === "conclude"){
	    	if(liveIn.data == "success"){
	    		$scope.output = "Successfully ran, loading result";
	    	} else {
	    		$scope.output = "Failed to run, retry";
	    	}
	    } else if(liveIn.type == "result"){
	    	if(liveIn.data){
		    	if(liveIn.data.VERDICT){
		    		$scope.output = liveIn.data.DISPLAY_VERDICT || '';
		    	} else {
		    		$scope.output = "Time Taken: " + liveIn.data.totalTime + " seconds \n_____________________\n" +
		    		liveIn.data.output;
		    	}
		    	$scope.debug = liveIn.data.DEBUG || '';	

	    	}
	    }
	});
	$scope.ws.onClose(function (event) {
	    console.log('WebSocket disconnected.');
	});
	$scope.removeWatcher = $scope.$watch('ws.readyState', function (newVal, oldVal, scope){
		$scope.changeReadyState();
	});
	$scope.changeReadyState = function(){
		if($scope.ws.readyState === 0){
			$scope.readyState =  'Connecting ...';
			$scope.readyStateClass = 'alert-success';
		} else if($scope.ws.readyState === 1){
			$scope.readyState =  'Connected';
			$scope.readyStateClass = 'alert-success';
		} else if($scope.ws.readyState === 2){
			$scope.readyState = 'Disconnecting ...';
			$scope.readyStateClass = 'alert-warning';
		} else {
			$scope.readyState = 'Disconnected';
			$scope.readyStateClass = 'alert-danger';
		}
	}
	$scope.changeReadyState();
	CodeEditorService.submit = function (){
		var live = {};
		live.source = CodeEditorService.document.getValue();
		live.lang = CodeEditorService.selectedLang.name;
		live.input = $scope.input;
		$scope.ws.send({'type':'live', 'data' : live});
	}
})