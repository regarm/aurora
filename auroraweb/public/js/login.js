aojApp.controller('LoginController', function($scope, $window, SessionService, Store){
	$scope.submit = function(){
		var data = {handle: $scope.login.handle, password: $scope.login.password};
		SessionService.save(data).$promise.then(function (response){
			$window.location.href = '/';
		}, function (err){
			if(err.status === 400){
				$scope.msg = 'Already logged in';
			} else if(err.status === 401){
				$scope.msg = 'Invalid Credentials';
			} else {
				$scope.msg = 'Unknown error occured';
			}
		});
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
