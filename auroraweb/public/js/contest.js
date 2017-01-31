aojApp = angular.module('childApp', ['datatables']);
aojApp.controller('ContestController', function($scope, $http, $window, flash){
	$scope.flash = flash;
	fetchContestProblemsList($scope, $http, flash);
})
aojApp.directive('problemInfoDisplay', function() {
	return {
		restrict: 'A',
		scope: {
			problemCode: "=",
			contestCode: "=",
			scoreSum: "="
		},
		controller: function ($scope, $http, flash){
			$scope.problem = {};
			$scope.problem.problemCode = $scope.problemCode;
			$scope.contest = {};
			$scope.contest.contestCode = $scope.contestCode;
			fetchProblemName($scope, $http, flash);
			fetchProblemScores($scope, $http, flash);
		},
		replace: true,
		template: '<tr> \
		<td><a href="/[[contest.contestCode]]/[[problem.problemCode]]">[[problem.problemCode]]</a></td>\
		<td><a href="/[[contest.contestCode]]/[[problem.problemCode]]">[[problem.problemName]]</a></td> \
		<td>[[scoreSum(problem.scores)]]</td> \
		<td>22/22</td>\
		</tr>',
	};
})
angular.module('aojApp').requires.push('childApp');