aojApp.factory('CodeEditorService', function(){
	var Editor = {};
	Editor.submit = function (){
		console.log('No submit function is defined');
	}
	Editor.selectedLang = "";
	Editor.selectedTheme = "";
	return Editor;
})
aojApp.controller('CodeEditorController', function($scope, CodeEditorService, LangService){
	$scope.selectedTheme = {id: 6, themeName: "Eclipse", themeCode: "eclipse", themeType: "light"},
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
	$scope.setTheme = function (){
		CodeEditorService.selectedTheme = $scope.selectedTheme;
		$scope._editor.setTheme('ace/theme/' + $scope.selectedTheme.themeCode);
	}
	$scope.langCache = {};
	$scope.setLang = function (){
		CodeEditorService.selectedLang = $scope.selectedLang;
		if($scope.langCache[$scope.selectedLang.name] && $scope.langCache[$scope.selectedLang.name].editor_mode){
			$scope._editor.getSession().setMode('ace/mode/' + $scope.langCache[$scope.selectedLang.name].editor_mode);
			$scope._editor.getSession().getDocument().setValue($scope.langCache[$scope.selectedLang.name].hello_world, 1);
		} else {
			$scope.langCache[$scope.selectedLang.name] = LangService.get({name : $scope.selectedLang.name});
			$scope.langCache[$scope.selectedLang.name]
			.$promise
			.then(function (){				
				$scope._editor.getSession().setMode('ace/mode/' + $scope.langCache[$scope.selectedLang.name].editor_mode);
				$scope._editor.getSession().getDocument().setValue($scope.langCache[$scope.selectedLang.name].hello_world, 1);
			})
		}
	}
	$scope.aceLoaded = function (_editor){
		$scope.langs = LangService.query();
		$scope.langs.$promise.then(function (){
			$scope.selectedLang = $scope.langs[0];
			$scope.setLang();
		});
		$scope._editor= _editor;
		CodeEditorService.document = _editor.getSession().getDocument();

		CodeEditorService.selectedTheme = $scope.selectedTheme;
		_editor.setTheme('ace/theme/' + $scope.selectedTheme.themeCode);
		
	}
	$scope.submit = CodeEditorService.submit;
})