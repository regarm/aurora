aojApp.run(function($rootScope, $http, $window, flash, SessionService, Store){
	Store.name = 'Aurora Online Judge';
  $rootScope.session = Store.getSession;
  Store.setSession(SessionService.get());
  $rootScope.logout = function (){
    SessionService.delete();
    Store.setSession(SessionService.get());
  }
  Store.scoreSum = function scoreSum(tasks){
    if(!tasks) return 0;
    var total = 0;
    for(count=0;count<tasks.length;count++){
      total += tasks[count].score;
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