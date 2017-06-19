aojApp = angular.module('childApp', ['datatables']);
aojApp.controller('ContestAllController', function($scope, ContestService){
	$scope.contests = ContestService.query();
})
aojApp.directive('contestListDisplay', function() {
	return {
		restrict: 'A',
		scope: {
			contestCode: "="
		},
		controller: function ($scope, $http, ContestService){
			$scope.contest = ContestService.get({contestCode : $scope.contestCode});
		},
		replace: true,
		template: '<tr> \
		<td><a href="/contest/[[contest.contestCode]]">[[contest.contestCode]]</a></td> \
		<td>[[contest.contestName]]</td> \
		<td>[[contest.startTime | date : "EEE, d MMM yyyy, hh:mm:ss a (IST)" : \'+530\']]</td> \
		<td>[[contest.endTime | date : "EEE, d MMM yyyy, hh:mm:ss a (IST)" : \'+530\']]</td>\
		</tr>',
	};
})
angular.module('aojApp').requires.push('childApp');