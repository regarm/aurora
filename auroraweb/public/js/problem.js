var aojApp = angular.module('child-app', ['ngRoute', 'ui.ace', 'angularScreenfull']);
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
	   activetab: 'msubs'
	})
	.when('/asubs', {
	   templateUrl: 'asubs.htm',
	   activetab: 'asubs'
	})
	.when('/submit', {
	   templateUrl: 'submit.htm',
	   activetab: 'submit',
	   controller: 'SubmitViewController'
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
	$scope.submit = function (){
		console.log('Trying to send submission ...');
		sendSubmission($scope, $http, $window, flash);
	}
})
angular.module("aojApp").requires.push('child-app');