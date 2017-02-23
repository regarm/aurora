aojApp = angular.module('childApp', []);
aojApp.controller('SubmissionsListController', function($scope, $http, $window, flash){
	$scope.flash = flash;
	fetchSubmissionsList($scope, $http, flash);
})
aojApp.directive('submissionListDisplay', function() {
	return {
		restrict: 'A',
		scope: {
			contestCode: "=",
			submissionId: "=",
			problemCode: "="
		},
		controller: function ($scope, $http, flash){
			$scope.submission = {};
			$scope.submission.contestCode = $scope.contestCode;
			$scope.submission.problemCode = $scope.problemCode;
			$scope.submission.submissionId = $scope.submissionId;
			fetchSubmissionSubmittedTime($scope, $http, flash);
			fetchSubmissionOverAllResult($scope, $http, flash);
			fetchSubmissionLang($scope, $http, flash);
			$scope.$watch('submission.lang', function (){
				$scope.lang = $scope.submission.lang;
				fetchLang($scope, $http, flash);
			});
			fetchSubmissionHandle($scope, $http, flash);
		},
		replace: true,
		template: '<tr> \
			<td class="aoj-submission-bar-id"> <a href="/[[submission.contestCode]]/[[submission.problemCode]]/[[submission.submissionId]]">[[submission.submissionId | limitTo : 7]]... </a> </td>\
			<td> [[submission.submitted | date : "EEE, d MMM yyyy, hh:mm:ss a (IST)" : \'+530\']] </td> \
			<td> [[submission.handle]] </td>\
			<td> <a href="/[[submission.contestCode]]">[[submission.contestCode]]</a> / <a href="/[[submission.contestCode]]/[[submission.problemCode]]">[[submission.problemCode]]</a></td>\
			<td> [[submission.overAllResult.verdict]] </td>\
			<td> [[submission.overAllResult.score]] </td>\
			<td> [[submission.overAllResult.timeTaken]] </td>\
			<td> [[submission.overAllResult.memoryTaken]] </td>\
			<td> [[lang.name]] </td>\
			<td> <a href="/[[submission.contestCode]]/[[submission.problemCode]]/[[submission.submissionId]]"> view </a> </td>\
		</tr>',
	};
})
angular.module('aojApp').requires.push('childApp');