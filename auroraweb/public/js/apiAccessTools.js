var services = angular.module('aojApp.services', ['ngResource']);

/** Problem Tools */

function updateProblemStmt($scope, $http, $sce, flash){
  var data = {};
  data.problemStmt = CKEDITOR.instances.problemEditor.getData();
  $http.post('/api/' + $scope.contest.contestCode + '/' + $scope.problem.problemCode + '/updateProblemStmt', data)
  .then(
    function success(response){
      $scope.problem.problemStmt = $sce.trustAsHtml(data.problemStmt);
      $scope.updateProblemStmt.loading = false;
      $scope.updateProblemStmt.success = true;
    },
    function error(response){
      $scope.updateProblemStmt.loading = false;
    
      $scope.updateProblemStmt.success = false;
      console.log(response.data);
    }
  )
}
function updateProblemTasks($scope, $http, $sce, flash){
  var data = {};
  data.tasks = $scope.problem.tasks;
  $http.post('/api/' + $scope.contest.contestCode + '/' + $scope.problem.problemCode + '/updateProblemTasks', data)
  .then(
    function success(response){
      $scope.updateProblemTasks.loading = false;
      $scope.updateProblemTasks.success = true;
    },
    function error(response){
      $scope.updateProblemTasks.loading = false;
      $scope.updateProblemTasks.success = false;
      console.log(response.data);
    }
  )
}
/****/

/*** Submission tools **/
function fetchSolution($scope, $http, $sce, flash){
  console.log('Fetching solution ...');
  $http.post('/api/' + $scope.contest.contestCode + '/' + $scope.problem.problemCode + '/' + $scope.submission.submissionId +  '/getSolution')
  .then(
    function success(response){
      if(response.data.success){
        $scope.submission.solution = response.data.solution;
      }
    },
    function error(response){
      console.log(response.data);
    }
  )
}
function fetchSubmissionSubmittedTime($scope, $http, flash){
  console.log('Fetching submission time of : %s', $scope.submission.submissionId);
  var url = '/api/' + $scope.submission.contestCode + '/' + $scope.submission.problemCode + '/' + $scope.submission.submissionId +  '/getSubmissionSubmittedTime';
  $http.post(url)
  .then(
    function success(response){
      if(response.data.success){
        $scope.submission.submitted = new Date(response.data.submitted);
      }
    },
    function error(response){
      console.log(response.data);
    }
  )
}
function fetchSubmissionOverAllResult($scope, $http, flash){
  console.log('Fetching overall result of : %s', $scope.submission.submissionId);
  var url = '/api/' + $scope.submission.contestCode + '/' + $scope.submission.problemCode + '/' + $scope.submission.submissionId +  '/getSubmissionOverAllResult';
  $http.post(url)
  .then(
    function success(response){
      if(response.data.success){
        $scope.submission.overAllResult = response.data.overAllResult;
      }
    },
    function error(response){
      console.log(response.data);
    }
  )
}
function fetchSubmissionLang($scope, $http, flash){
  console.log('Fetching language of : %s', $scope.submission.submissionId);
  var url = '/api/' + $scope.submission.contestCode + '/' + $scope.submission.problemCode + '/' + $scope.submission.submissionId +  '/getSubmissionLang';
  $http.post(url)
  .then(
    function success(response){
      if(response.data.success){
        $scope.submission.lang = response.data.lang;
      }
    },
    function error(response){
      console.log(response.data);
    }
  )
}
function fetchSubmissionHandle($scope, $http, flash){
  console.log('Fetching handle for the ubmission: %s', $scope.submission.submissionId);
  var url = '/api/' + $scope.submission.contestCode + '/' + $scope.submission.problemCode + '/' + $scope.submission.submissionId +  '/getSubmissionHandle';
  $http.post(url)
  .then(
    function success(response){
      if(response.data.success){
        $scope.submission.handle = response.data.handle;
      }
    },
    function error(response){
      console.log(response.data);
    }
  )
}
/****/

/** Solution tools */
function sendSubmission($scope, $http, $window, flash){
  var data = {solution: $scope._document.getValue(), langId: $scope.selectedLang.langId, problemCode: $scope.problem.problemCode, contestCode: $scope.contest.contestCode, handle: $scope.session.handle};
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

/****/
function fetchLang($scope, $http, flash){
  if(!$scope.lang) return ;
  console.log('Fetching language info of : %s', $scope.lang.langId);
  var url = '/api/getLang/' + $scope.lang.langId;
  $http.post(url)
  .then(
    function success(response){
      if(response.data.success){
        $scope.lang = response.data.lang;
      }
    },
    function error(response){
      console.log(response.data);
    }
  )
}
function fetchLangs($scope, $http, $window, flash, callback){
  var url = '/api/getLangs';
  $http.post(url)
  .then(
    function success(response){
      callback(null, response.data)
    },
    function error(err){
      callback(err);
    }
  )
}
/**/

/** Counter Tools **/
function fetchNextCounter($scope, $http, flash, cb){
  var url = '/api/getNextCounter';
  $http.post(url)
  .then(
    function success(response){
      cb(null, response.data.seq);
    },
    function error(error){
      cb(error);
    }
  )
}
/**/

/** All Verdicts **/
function fetchVerdicts($http, flash, callback){
  var url = '/api/fetchVerdicts';
  $http.post(url)
  .then(
    function success(response){
      callback(null, response.data);
    },
    function error(error){
      callback(error);
    }
  )
}
/**/