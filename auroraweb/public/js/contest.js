aojApp = angular.module('childApp', ['datatables']);
aojApp.controller('ContestController', function($scope, ContestService){
	$scope.contest = ContestService.get({contestCode : $scope.contestCode});
})
aojApp.directive('problemInfoDisplay', function() {
	return {
		restrict: 'A',
		scope: {
			problemCode: "=",
			contestCode: "=",
			scoreSum: "="
		},
		controller: function ($scope, ContestService, ProblemService){
			$scope.problem = ProblemService.get({contestCode : $scope.contestCode, problemCode : $scope.problemCode});
			$scope.contest = ContestService.get({contestCode : $scope.contestCode});
		},
		replace: true,
		template: '<tr> \
		<td><a href="/contest/[[contest.contestCode]]/problem/[[problem.problemCode]]">[[problem.problemCode]]</a></td>\
		<td><a href="/contest/[[contest.contestCode]]/problem/[[problem.problemCode]]">[[problem.problemName]]</a></td> \
		<td>[[scoreSum(problem.tasks)]]</td> \
		<td>22/22</td>\
		</tr>',
	};
})
angular.module('aojApp').requires.push('childApp');