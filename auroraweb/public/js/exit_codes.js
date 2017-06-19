var aojApp = angular.module('child-app', ['ngRoute']);
aojApp.controller('ExitCodeController', function($scope, $location, VerdictService){
	$scope.verdicts = VerdictService.query();
	$scope.isActive = function(route) {
        return (route === $location.path());
    }
});
aojApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/all', {
	   templateUrl: 'all.htm',
	   activetab: 'all',
	   controller: "AllController"
	})
	.when('/admin', {
	   templateUrl: 'admin.htm',
	   activetab: 'admin',
	   controller: 'AdminController'
	})
	.when('/user', {
	   templateUrl: 'user.htm',
	   activetab: 'user',
	   controller: 'UserController'
	})
	.otherwise({
	   redirectTo: '/all'
	});
}]);

aojApp.controller('AllController', function($scope, $http, $location, flash){
})
aojApp.controller('AdminController', function($scope, $http, $location, flash){
})
aojApp.controller('UserController', function($scope, $http, $location, flash){
})
angular.module("aojApp").requires.push('child-app');