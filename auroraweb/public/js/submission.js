aojApp.controller('SubmissionController', function($scope, $rootScope, SubmissionService, LangService){
	$scope.submission = SubmissionService.get({problemCode : $scope.problemCode, contestCode : $scope.contestCode, submissionId : $scope.submissionId});
	$scope.submission
	.$promise
	.then(function (){
		$scope.lang = LangService.get({name : $scope.submission.lang});
	})
})