var aojApp = angular.module('aojApp', []);
aojApp.config(function($interpolateProvider){
 $interpolateProvider.startSymbol('[[').endSymbol(']]');
});
aojApp.run(function($rootScope, $http, $window, flash){
	$rootScope.name = 'Aurora Online Judge';
  console.log('Fetching session ...');
  fetchSession($rootScope, $http, flash);
  $rootScope.logout = function (){
    console.log('Trying logging out');
    logout($rootScope, $http, $window, flash);
  }
  $rootScope.scoreSum = function scoreSum(scoreArray){
    if(!scoreArray) return 0;
    var total = 0;
    for(count=0;count<scoreArray.length;count++){
      total += scoreArray[count];
    }
    return total;
  }
});

aojApp.factory("flash", function($rootScope) {
  var currentMessage = {};
  return {
    setMessage: function(message) {
      console.log('Setting flash message: ', message);
      currentMessage = message;
    },
    getMessage: function() {
      console.log('Returning flash message: ', currentMessage);
      return currentMessage;
    }
  };
});