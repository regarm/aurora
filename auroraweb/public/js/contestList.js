aojApp = angular.module('childApp', ['datatables']);
aojApp.controller('ContestListController', function($scope, $http, $window, flash){
	$scope.flash = flash;
	fetchContestList($scope, $http, flash);
})
aojApp.directive('contestListDisplay', function() {
	return {
		restrict: 'A',
		scope: {
			contestCode: "="
		},
		controller: function ($scope, $http, flash){
			$scope.contest = {};
			$scope.contest.contestCode = $scope.contestCode;
			fetchContestName($scope, $http, flash);
			fetchContestEndTimes($scope, $http, flash);
			console.log($scope.contest);
		},
		replace: true,
		template: '<tr> \
		<td><a href="/[[contest.contestCode]]">[[contest.contestCode]]</a></td> \
		<td>[[contest.contestName]]</td> \
		<td>[[contest.startTime | date : "EEE, d MMM yyyy, hh:mm:ss a (IST)" : \'+530\']]</td> \
		<td>[[contest.endTime | date : "EEE, d MMM yyyy, hh:mm:ss a (IST)" : \'+530\']]</td>\
		</tr>',
	};
})
angular.module('aojApp').requires.push('childApp');