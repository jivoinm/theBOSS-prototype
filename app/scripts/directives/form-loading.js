'use strict';

angular.module('theBossApp')
  .directive('formLoading', ['usSpinnerService', function (usSpinnerService) {
	 return {
            template: '<span us-spinner spinner-key="spinner-1"></span>',
            link: function (scope, element, attrs) {
                scope.loadCount = 0;
                scope.$on('loadingData', function() {
                    if (scope.loadCount === 0) {
                        //element.addClass('visibleLoader');
                        usSpinnerService.spin('spinner-1');
                    }
                    scope.loadCount++;
                })

                scope.$on('loadComplete', function() {
                    if (scope.loadCount > 0) {
                        scope.loadCount--;
                        if (scope.loadCount === 0) {
                            //element.removeClass('visibleLoader');
                            usSpinnerService.stop('spinner-1');
                        }
                    }
                })
            }
        };
}]);
