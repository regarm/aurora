var aojApp = angular.module('aojApp', ['ui.bootstrap']);

aojApp.config(function($interpolateProvider){
  $interpolateProvider.startSymbol('[[').endSymbol(']]');
});

aojApp.filter('TrustAsHtml', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

aojApp.factory('Store', function(){
	var Store = {};
	return {
		setSession : function (session){
			Store.session = session;
		},
		getSession : function (){
			return Store.session;
		}
	}
})