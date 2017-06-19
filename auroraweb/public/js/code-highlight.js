aojApp.directive('codeHighlight', ['$compile', '$timeout',
  function ($compile, $timeout) {
    return {
      restrict: 'E',
      scope: {
        type: '=',
        source: '='
      },
      link: function(scope, element) {
        var timeout;
        scope.$watch('type', function(value) {
          if (!value) return;
          element.html('<pre class="line-numbers"><code>[[source]]</code></pre>');
          $compile(element.contents())(scope);
          var code = element.find('code')[0];
          code.className = scope.type;
          timeout = $timeout(function() {
            Prism.highlightElement(code);
          }, 0, false);
        });
        scope.$on('$destroy', function () {
          $timeout.cancel( timeout );
        });
      }
    };
  }
]);