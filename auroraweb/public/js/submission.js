aojApp.controller('SubmissionController', function($scope, SubmissionService){
	$scope.submission = SubmissionService.get({problemCode : $scope.problemCode, contestCode : $scope.contestCode, submissionId : $scope.submissionId});
})