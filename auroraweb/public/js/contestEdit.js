aojApp.requires.push('ui.bootstrap.datetimepicker');
aojApp.controller('ContestEditController', function($scope, $window, ContestService){
	$scope.contest = ContestService.get({contestCode : $scope.contestCode});
	$scope.contest.$promise
	.then(function(){
		$scope.contest.startTime = new Date($scope.contest.startTime);
		$scope.contest.endTime = new Date($scope.contest.endTime);
		// $scope.contest.problems = JSON.stringify($scope.contest.problems);
	})
	$scope.updateContestCode = {};
	$scope.updateContestCode.update = function (){
		$scope.updateContestCode.status = '';
		ContestService.update({contestCode : $scope.contestCode}, {contestCode: $scope.contest.contestCode})
		.$promise
		.then(function(){
			$window.location.href = "/contest/" + $scope.contest.contestCode + "/edit";
			$scope.updateContestCode.status = 'OK';
		})
		.catch(function(){
			$scope.updateContestCode.status = '!OK';
		})
	}
	$scope.updateContestName = {};
	$scope.updateContestName.update = function (){
		$scope.updateContestName.status = '';
		ContestService.update({contestCode : $scope.contestCode}, {contestName: $scope.contest.contestName})
		.$promise
		.then(function(){
			$scope.updateContestName.status = 'OK';
		})
		.catch(function(){
			$scope.updateContestName.status = '!OK';
		})
	}
	$scope.updateStartTime = {};
	$scope.updateStartTime.update = function (){
		$scope.updateStartTime.status = '';
		ContestService.update({contestCode : $scope.contestCode}, {startTime: $scope.contest.startTime.toISOString()})
		.$promise
		.then(function(){
			$scope.updateStartTime.status = 'OK';
		})
		.catch(function(){
			$scope.updateStartTime.status = '!OK';
		})
	}
	$scope.updateEndTime = {};
	$scope.updateEndTime.update = function (){
		$scope.updateEndTime.status = '';
		ContestService.update({contestCode : $scope.contestCode}, {endTime: $scope.contest.endTime.toISOString()})
		.$promise
		.then(function(){
			$scope.updateEndTime.status = 'OK';
		})
		.catch(function(){
			$scope.updateEndTime.status = '!OK';
		})
	}
	$scope.updateProblems = {};
	$scope.updateProblems.update = function (){
		$scope.updateProblems.status = '';
		ContestService.update({contestCode : $scope.contestCode}, {problems: $scope.contest.problems})
		.$promise
		.then(function(){
			$scope.updateProblems.status = 'OK';
		})
		.catch(function(){
			$scope.updateProblems.status = '!OK';
		})
	}
	$scope.updateAll = {};
	$scope.updateAll.update = function (){
		$scope.updateAll.status = '';
		ContestService.update({contestCode : $scope.contestCode}, {contestCode: $scope.contest.contestCode, contestName: $scope.contest.contestName, startTime: $scope.contest.startTime.toISOString(), endTime: $scope.contest.endTime.toISOString(), problems: $scope.contest.problems})
		.$promise
		.then(function(){
			$window.location.href = "/contest/" + $scope.contest.contestCode + "/edit";
			$scope.updateAll.status = 'OK';
		})
		.catch(function(){
			$scope.updateAll.status = '!OK';
		})
	}
	$scope.removeProblem = function (idx){
		$scope.contest.problems.splice(idx, 1);
	}
})