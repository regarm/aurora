aojApp.requires.push('ngRoute', 'angularScreenfull', 'angularFileUpload', 'ui.ace');
aojApp.controller('ProblemController', function($scope, $window, $location, ProblemService, ContestService, SubmissionService, CodeEditorService, Store){
	$scope.problem = ProblemService.get({contestCode : $scope.contestCode, problemCode : $scope.problemCode});
	$scope.contest = ContestService.get({contestCode : $scope.contestCode});
	CodeEditorService.submit = function (){
		var problem = {};
		problem.solution = CodeEditorService.document.getValue();
		problem.problemCode = $scope.problemCode;
		problem.contestCode = $scope.contestCode;
		problem.lang = CodeEditorService.selectedLang.name;
		problem.handle = Store.getSession().handle;
		SubmissionService.save({contestCode : $scope.contestCode, problemCode : $scope.problemCode}, problem)
		.$promise.
		then(function (response){
			$window.location.href = "/contest/" + $scope.contestCode + "/problem/" + $scope.problemCode + "/submission/" + response.submissionId;
		})
	}
	$scope.isActive = function(route) {
        return (route === $location.path());
    }
});
aojApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/problem', {
	   templateUrl: 'problem.htm',
	   activetab: 'problem',
	   controller: "ProblemViewController"
	})
	.when('/editorial', {
	   templateUrl: 'editorial.htm',
	   activetab: 'editorial',
	   controller: 'EditorialViewController'
	})
	.when('/msubs', {
	   templateUrl: 'msubs.htm',
	   activetab: 'msubs',
	   controller: 'MSubsViewController'
	})
	.when('/asubs', {
	   templateUrl: 'asubs.htm',
	   activetab: 'asubs',
	   controller: 'ASubsViewController'
	})
	.when('/submit', {
	   templateUrl: 'submit.htm',
	   activetab: 'submit'
	})
	.when('/problemEdit', {
		templateUrl: 'problemEdit.htm',
		activetab: 'problemEdit',
		controller: 'ProblemEditController'
	})
	.otherwise({
	   redirectTo: '/problem'
	});
}]);

aojApp.controller('ProblemViewController', function($scope, $http, $sce, flash){
})
aojApp.controller('EditorialViewController', function($scope, $http, $sce, flash){
	console.log('Fetching editorial');
})
// aojApp.controller('SubmitViewController', CodeEditorController);
aojApp.controller('ASubsViewController', function($scope, ProblemService, ContestService, SubmissionService){
	$scope.submissions = SubmissionService.query({contestCode:$scope.contestCode,problemCode:$scope.problemCode});
})
aojApp.controller('MSubsViewController', function($scope, ProblemService, ContestService, SubmissionService){
	$scope.submissions = SubmissionService.query({contestCode:$scope.contestCode,problemCode:$scope.problemCode, where:{'handle': 'CODOPEDIAC3'}});
})
aojApp.directive('submissionListDisplay', function() {
	return {
		restrict: 'A',
		scope: {
			contestCode: "=",
			submissionId: "=",
			problemCode: "=",
			session: "="
		},
		controller: function ($scope, ContestService, ProblemService, SubmissionService){
			$scope.submission = SubmissionService.get({contestCode : $scope.contestCode, problemCode: $scope.problemCode, submissionId: $scope.submissionId});
		},
		replace: true,
		template: '<tr> \
			<td class="aoj-submission-bar-id"> <a href="/contest/[[submission.contestCode]]/problem/[[submission.problemCode]]/submission/[[submission.submissionId]]">[[submission.submissionId | limitTo : 7]]... </a> </td>\
			<td> [[submission.creationTime | date : "EEE, d MMM yyyy, hh:mm:ss a (IST)" : \'+530\']] </td> \
			<td> [[submission.handle]] </td>\
			<td> <a href="/contest/[[submission.contestCode]]">[[submission.contestCode]]</a> / <a href="/contest/[[submission.contestCode]]/problem/[[submission.problemCode]]">[[submission.problemCode]]</a></td>\
			<td> [[submission.overAllResult.verdict]] </td>\
			<td> [[submission.overAllResult.score]] </td>\
			<td> [[submission.overAllResult.timeTaken]] </td>\
			<td> [[submission.overAllResult.memoryTaken]] </td>\
			<td> [[submission.lang]] </td>\
			<td> <a href="/contest/[[submission.contestCode]]/problem/[[submission.problemCode]]/submission/[[submission.submissionId]]"> view </a> </td>\
		</tr>',
	};
})
aojApp.controller('ProblemEditController', function($scope, ProblemService){
	$scope.updateProblemStmt = {};
	$scope.updateProblemStmtAction = function (){
		$scope.updateProblemStmt.loading = true;
		$scope.updateProblemStmt.status = "";
		ProblemService.update({contestCode : $scope.problem.contestCode, problemCode:$scope.problem.problemCode, problemStmt :CKEDITOR.instances.problemEditor.getData()})
		.$promise
		.then(function (response){
			$scope.updateProblemStmt.loading = false;
			$scope.updateProblemStmt.status = "Success!";
		})
		.catch(function (response){
			$scope.updateProblemStmt.loading = false;
			$scope.updateProblemStmt.status = "Failed!";
		})
	}
})

aojApp.controller('UploadController', function($attrs, $scope, FileUploader) {
    $scope.uploader = new FileUploader({url: '/api/contest/' + $scope.contestCode + '/problem/' + $scope.problemCode + '/file'});
    $scope.uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
        	$scope.uploader.clearQueue();
            return true;
        }
    });
    $scope.uploader.onSuccessItem = function (item, response, status, headers){
    	if($scope.type == 'input'){
    		$scope.task.input = response.fileId;
    	} else {
    		$scope.task.output = response.fileId;
    	}
	}
});
aojApp.controller('taskEditController', function($scope, CounterService, ProblemService){
	$scope.addNewSubtask = function (tasks)	{
		var counter = CounterService.get();
		counter.$promise
		.then(function (){
			var subtask = {};
			subtask.id = counter.value;
			subtask.score = 0;
			subtask.timeLimit = 1;
			subtask.memoryLimit = 256;
			subtask.io = [];
			tasks.push(subtask);
		})
	}
	$scope.addNewTask = function (subtask)	{
		var counter = CounterService.get();
		counter.$promise
		.then(function (){
			subtask.io.push({id: counter.value, input: '', output: ''});
		})
	}
	$scope.updateProblemTasksAction = function (){
		$scope.updateProblemTasks = {};
		$scope.updateProblemTasks.loading = true;
		$scope.updateProblemTasks.status = "";
		console.log($scope.problem.tasks);
		ProblemService.update({problemCode: $scope.problemCode, contestCode: $scope.contestCode}, {tasks: $scope.problem.tasks})
		.$promise
		.then(function (){
			$scope.updateProblemTasks.loading = false;
			$scope.updateProblemTasks.status = "Successfull !";
		})
		.catch(function(){
			$scope.updateProblemTasks.loading = false;
			$scope.updateProblemTasks.status = "Failed !";
		})
	}
})