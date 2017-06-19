aojApp.requires.push('ngRoute');
aojApp.controller('SettingController', function($scope, $location, LangService){
	$scope.isActive = function(route) {
        return (route === $location.path());
    }
    $scope.updateAction = function(lang){
    	LangService.update({name: lang.name}, lang)
    	.$promise
    	.then(function(){
    	})
    	.catch(function(){
    		
    	})
    }
});
aojApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/lang', {
	   templateUrl: 'lang.htm',
	   activetab: 'lang',
	   controller: "LangViewController"
	})
	.otherwise({
	   redirectTo: '/lang'
	});
}]);

aojApp.directive('langDisplay', function() {
	return {
		restrict: 'A',
		scope: {
			name: "=",
			lang: "=",
		},
		controller: function ($scope, LangService){
			$scope.lang = LangService.get({name:$scope.name});
		}
	};
})
aojApp.controller('LangViewController', function($scope, LangService){
	$scope.langs = LangService.query();
})