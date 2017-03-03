var aojApp = angular.module('child-app', ['ngRoute', 'ui.ace', 'angularScreenfull', 'angularFileUpload']);
aojApp.controller('ProblemController', function($scope, $http, $location, flash){
	fetchProblemName($scope, $http, flash);
	fetchContestName($scope, $http, flash);
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
	   activetab: 'submit',
	   controller: 'SubmitViewController'
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
	if(!$scope.problem.problemStmt){
		console.log('Fetching Problem Statement');
		fetchProblemStmt($scope, $http, $sce, flash);
	}
})
aojApp.controller('EditorialViewController', function($scope, $http, $sce, flash){
	console.log('Fetching editorial');
})
aojApp.controller('SubmitViewController', function($scope, $http, $window, flash){
	$scope.selectedTheme = {id: 16,  themeName: "Ambiance",  themeCode: "ambiance" ,  themeType: "dark"    }
	$scope.themeData = [
	    {id: 1 ,  themeName: "Chrome"               ,  themeCode: "chrome"                  ,  themeType: "light"   },
	    {id: 2 ,  themeName: "Clouds"               ,  themeCode: "clouds"                  ,  themeType: "light"   },
	    {id: 3 ,  themeName: "Crimson Editor"       ,  themeCode: "crimson_editor"          ,  themeType: "light"   },
	    {id: 4 ,  themeName: "Dawn"                 ,  themeCode: "dawn"                    ,  themeType: "light"   },
	    {id: 5 ,  themeName: "Dreamweaver"          ,  themeCode: "dreamweaver"             ,  themeType: "light"   },
	    {id: 6 ,  themeName: "Eclipse"              ,  themeCode: "eclipse"                 ,  themeType: "light"   },
	    {id: 7 ,  themeName: "GitHub"               ,  themeCode: "github"                  ,  themeType: "light"   },
	    {id: 8 ,  themeName: "IPlastic"             ,  themeCode: "iplastic"                ,  themeType: "light"   },
	    {id: 9 ,  themeName: "Solarized Light"      ,  themeCode: "solarized_light"         ,  themeType: "light"   },
	    {id: 10,  themeName: "TextMate"             ,  themeCode: "textmate"                ,  themeType: "light"   },
	    {id: 11,  themeName: "Tomorrow"             ,  themeCode: "tomorrow"                ,  themeType: "light"   },
	    {id: 12,  themeName: "XCode"                ,  themeCode: "xcode"                   ,  themeType: "light"   },
	    {id: 13,  themeName: "Kuroir"               ,  themeCode: "kuroir"                  ,  themeType: "light"   },
	    {id: 14,  themeName: "KatzenMilch"          ,  themeCode: "katzenmilch"             ,  themeType: "light"   },
	    {id: 15,  themeName: "SQL Server"           ,  themeCode: "sqlserver"               ,  themeType: "light"   },
	    {id: 16,  themeName: "Ambiance"             ,  themeCode: "ambiance"                ,  themeType: "dark"    },
	    {id: 17,  themeName: "Chaos"                ,  themeCode: "chaos"                   ,  themeType: "dark"    },
	    {id: 18,  themeName: "Clouds Midnight"      ,  themeCode: "clouds_midnight"         ,  themeType: "dark"    },
	    {id: 19,  themeName: "Cobalt"               ,  themeCode: "cobalt"                  ,  themeType: "dark"    },
	    {id: 20,  themeName: "Gruvbox"              ,  themeCode: "gruvbox"                 ,  themeType: "dark"    },
	    {id: 21,  themeName: "idle Fingers"         ,  themeCode: "idle_fingers"            ,  themeType: "dark"    },
	    {id: 22,  themeName: "krTheme"              ,  themeCode: "kr_theme"                ,  themeType: "dark"    },
	    {id: 23,  themeName: "Merbivore"            ,  themeCode: "merbivore"               ,  themeType: "dark"    },
	    {id: 24,  themeName: "Merbivore Soft"       ,  themeCode: "merbivore_soft"          ,  themeType: "dark"    },
	    {id: 25,  themeName: "Mono Industrial"      ,  themeCode: "mono_industrial"         ,  themeType: "dark"    },
	    {id: 26,  themeName: "Monokai"              ,  themeCode: "monokai"                 ,  themeType: "dark"    },
	    {id: 27,  themeName: "Pastel on dark"       ,  themeCode: "pastel_on_dark"          ,  themeType: "dark"    },
	    {id: 28,  themeName: "Solarized Dark"       ,  themeCode: "solarized_dark"          ,  themeType: "dark"    },
	    {id: 29,  themeName: "Terminal"             ,  themeCode: "terminal"                ,  themeType: "dark"    },
	    {id: 30,  themeName: "Tomorrow Night"       ,  themeCode: "tomorrow_night"          ,  themeType: "dark"    },
	    {id: 31,  themeName: "Tomorrow Night Blue"  ,  themeCode: "tomorrow_night_blue"     ,  themeType: "dark"    },
	    {id: 32,  themeName: "Tomorrow Night Bright",  themeCode: "tomorrow_night_bright"   ,  themeType: "dark"    },
	    {id: 33,  themeName: "Tomorrow Night 80s"   ,  themeCode: "tomorrow_night_eighties" ,  themeType: "dark"    },
	    {id: 34,  themeName: "Twilight"             ,  themeCode: "twilight"                ,  themeType: "dark"    },
	    {id: 35,  themeName: "Vibrant Ink"          ,  themeCode: "vibrant_ink"             ,  themeType: "dark"    }
	];
	$scope.aceLoaded = function (_editor){
		$scope._editor = _editor;
		$scope._session = _editor.getSession();
		$scope._document = _editor.getSession().getDocument();
		_editor.setTheme('ace/theme/' + $scope.selectedTheme.themeCode);
		_editor.getSession().setMode('ace/mode/c_cpp');
		$scope.$watch('selectedTheme', function(newVal, oldVal){
			console.log('New theme selected');
			console.log($scope.selectedTheme);
			_editor.setTheme('ace/theme/' + $scope.selectedTheme.themeCode);
		});
	}
	fetchLangs($scope, $http, $window, flash);
	$scope.$watch('langs', function (newVal, oldVal){
		if($scope.langs && $scope.langs.length){
			$scope.selectedLang = $scope.langs[0];
		}
	});
	$scope.submit = function (){
		console.log('Trying to send submission ...');
		sendSubmission($scope, $http, $window, flash);
	}
})
aojApp.controller('ASubsViewController', function($scope, $http, $sce, flash){
	console.log('Fetching asubs of problem');
	fetchASubsList($scope, $http, $sce, flash);
})
aojApp.controller('MSubsViewController', function($scope, $http, $sce, flash){
	console.log('Fetching msubs of problem');
	$scope.$watch('session', function (){
		fetchMSubsList($scope, $http, $sce, flash);
	});
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
aojApp.controller('ProblemEditController', function($scope, $http, $sce, flash){
	fetchProblemStmt($scope, $http, $sce, flash);
	fetchProblemTasks($scope, $http, $sce, flash);
	$scope.updateProblemStmt = {};
	$scope.updateProblemStmtAction = function (){
		$scope.updateProblemStmt.loading = true;
		$scope.updateProblemStmt.status = "";
		updateProblemStmt($scope, $http, $sce, flash);
		$scope.$watch('updateProblemStmt.loading', function(newVal, oldVal){
			if(newVal == false){
				if($scope.updateProblemStmt.success){
					$scope.updateProblemStmt.status = "Successfull !"
				} else {
					$scope.updateProblemStmt.status = "Failed !"
				}
			}
		})
	}
})

aojApp.controller('UploadController', function($attrs, $scope, FileUploader) {
    $scope.uploader = new FileUploader({url: '/api/fileUpload'});
    $scope.alert = function (param){
    	console.log(param);
    }
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
aojApp.controller('taskEditController', function($scope, $http, $sce, flash){
	$scope.addNewSubtask = function (tasks)	{
		var subtask = {};
		subtask.score = 0;
		subtask.timeLimit = 1;
		subtask.memoryLimit = 256;
		subtask.io = [];
		tasks.push(subtask);
	}
	$scope.addNewTask = function (subtask)	{
		subtask.io.push({input: '', output: ''});
	}
	$scope.updateProblemTasksAction = function (){
		$scope.updateProblemTasks = {};
		$scope.updateProblemTasks.loading = true;
		$scope.updateProblemTasks.status = "";
		updateProblemTasks($scope, $http, $sce, flash);
		$scope.$watch('updateProblemTasks.loading', function(newVal, oldVal){
			if(newVal == false){
				if($scope.updateProblemTasks.success){
					$scope.updateProblemTasks.status = "Successfull !"
				} else {
					$scope.updateProblemTasks.status = "Failed !"
				}
			}
		})	
	}
})
angular.module("aojApp").requires.push('child-app');