aojApp.controller('SubmissionController', function($scope, $http, $sce, flash){
	$scope.flash = flash;
	fetchSolution($scope, $http, $sce, flash);
})