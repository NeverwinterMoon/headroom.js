(function(angular) {

  if (!angular) {
    return;
  }

  ///////////////
  // Directive //
  ///////////////

  angular.module('headroom', []).directive('headroom', function() {
    return {
      restrict: 'EA',
      scope:    {
        tolerance: '=',
        offset:    '=',
        classes:   '=',
        scroller:  '@',
        active:    '='
      },
      link:     function(scope, element) {
        var headroom;

        scope.$watch('active', function(value) {
          if (!value && headroom) headroom.destroy();
          if (!value) return;

          var options = {};
          angular.forEach(Headroom.options, function(value, key) {
            options[key] = scope[key] || Headroom.options[key];
          });
          if (options.scroller) {
            options.scroller = angular.element(options.scroller)[0];
          }
          headroom = new Headroom(element[0], options);
          headroom.init();
        });

        scope.$on('$destroy', function() {
          if (headroom) headroom.destroy();
        });
      }
    };
  });

}(window.angular));
