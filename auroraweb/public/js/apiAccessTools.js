
/** Problem Tools */
function fetchProblemName($scope, $http, flash){
  console.log('Requesting problem ' + $scope.problem.problemCode + ' name ...');
  var data = {problemCode: $scope.problem.problemCode};
  $http.post('/api/' + $scope.contest.contestCode + '/' + $scope.problem.problemCode + '/getProblemName', data)
  .then(
    function success(response){
      $scope.problem.problemName = response.data.problemName;
    },
    function error(response){
      console.log(response.data);
    }
  )
}
function fetchProblemScores($scope, $http, flash){
  console.log('Requesting problem ' + $scope.problem.problemCode + ' score ...');
  $http.post('/api/' + $scope.contest.contestCode + '/' + $scope.problem.problemCode + '/getProblemScores')
  .then(
    function success(response){
      if(response.data.success){
        $scope.problem.scores = response.data.scores;
      } 
    },
    function error(response){
      console.log('Unknown error occured while fetching score');
    }
  )
}
function fetchProblemStmt($scope, $http, $sce, flash){
  var data = {problemCode: $scope.problem.problemCode};
  $http.post('/api/' + $scope.contest.contestCode + '/' + $scope.problem.problemCode + '/getProblemStmt', data)
  .then(
    function success(response){
      $scope.problem.problemStmt = $sce.trustAsHtml(response.data.problemStmt);
    },
    function error(response){
      console.log(response.data);
    }
  )
}

/****/

/** Contest Tools */
function fetchContestName($scope, $http, flash){
  var data = {contestCode: $scope.contest.contestCode};
  $http.post('/api/' + $scope.contest.contestCode + '/getContestName', data)
  .then(
    function success(response){
      $scope.contest.contestName = response.data.contestName;
    },
    function error(response){
      console.log(response.data);
    }
  )
}
function fetchContestProblemsList($scope, $http, flash){
  console.log('Fetching contest problems list ...')
  $http.post('/api/' + $scope.contest.contestCode + '/getContestProblemsList')
  .then(
    function success(response){
      console.log('Contest problems successfully received.');
      $scope.contest.problems = response.data;
    },
    function error(response){
      console.log(response.data);
    }
  )
}
function fetchContestList($scope, $http, flash){
  console.log('Fetching contest list ...');
  $http.post('/api/getContestList')
  .then(
    function success(response){
      if(response.data.success){
        $scope.contests = response.data.contestList;
      }
    },
    function error(response){
      console.log(response.data);
    }
  )
}
function fetchContestEndTimes($scope, $http, flash){
  console.log('Fetching contest end times ...');
  $http.post('/api/' + $scope.contestCode + '/getContestEndTimes')
  .then(
    function success(response){
      if(response.data.success){
        $scope.contest.startTime = new Date(response.data.endTimes.startTime);
        $scope.contest.endTime = new Date(response.data.endTimes.endTime);
      }
    },
    function error(response){
      console.log(response.data);
    }
  )
}
/****/

/** Session tools */
function fetchSession($scope, $http, flash){
  $http.post('/api/getSession')
  .then(
    function success(response){
      console.log('Session fetched : ', response.data);
      $scope.session = response.data;
    },
    function error(){
      console.log('Error occured while fetching session');
      flash.setMessage({type: 'warning', msg: 'Unknown error'});
    }
  )
}
function logout($scope, $http, $window, flash){
  $http.post('/api/logout')
  .then(
    function success(response){
     flash.setMessage({type: 'success', msg: 'Successfully logged out'}); 
     $window.location.href = '/';

    },
    function error(){
      console.log('Error occured while logging out');
      flash.setMessage({type: 'warning', msg: 'Unknown error'});
    }
  ) 
}
/****/

/** Solution tools */
function sendSubmission($scope, $http, $window, flash){
  var data = {solution: $scope._document.getValue(), lang: 'C++', problemCode: $scope.problem.problemCode, contestCode: $scope.contest.contestCode, handle: $scope.session.handle};
  $http.post('/api/' + $scope.contest.contestCode + '/' + $scope.problem.problemCode + '/submit', data)
  .then(
    function success(response){
      if(response.data.success){
        console.log('Submission successfully sent.');
        console.log('Submission id received: ', response.data.submissionId);
        flash.setMessage({msg: response.data.msg, type: response.data.msgType});
        $window.location.href = '/' + $scope.contest.contestCode + '/' + $scope.problem.problemCode + '/' + response.data.submissionId;
      } else {
        console.log('Submission coundn\'t be sent');
        flash.setMessage({msg: response.data.msg, type: response.data.msgType});
      }
    },
    function error(response){
      console.log('Unknown error occured.');
      flash.setMessage({msg: 'Unknown error occured', type: 'warning'});
    }
  )
}
/****/