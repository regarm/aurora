aojApp.controller('LoginController', function($scope, $http, $window, flash){
	$scope.flash = flash;
	$scope.submit = function(){
		var data = {handle: $scope.login.handle, password: $scope.login.password};
		$http.post('/api/login', data)
		.then(
			function success(response){
				if(response.data.authorize.loggedIn){
					flash.setMessage({msg: response.data.msg, type: response.data.msgType});
					$window.location.href = '/';
				} else {
					flash.setMessage({msg: response.data.msg, type: response.data.msgType});
				}
				console.log(response.data);
			},
			function err(response){
				flash.setMessage({msg: 'Unknown error occured', type: 'warning'});
				console.log(response.status);
			}
		)
	}
})
aojApp.directive('ensureExists', function ($http) {
	return {
		require: 'ngModel',
		link: function(scope, ele, attrs, c) {
			scope.$watch(attrs.ngModel, function(n) {
				if (!n) return;
				$http.post('/api/handleExistance', {handle: attrs.ensureExists})
				.then(
					function success(response) {
						c.$setValidity('exists', response.data.exists);
					},
					function error(response) {
						flash.setMessage({msg: 'Unknown error occured', type: 'warning'});
						c.$setValidity('exists', false);
					}
				)
			});
		}
	}
});
