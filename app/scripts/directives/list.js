'use strict';

angular.module('theBossApp')
  .directive('list', function (FormService) {
    return {
        comtroller: function($scope){

    	},
        templateUrl: './views/directive-templates/list.html',
        restrict: 'E',
        scope: {
            list:'=',
        }
    };
  });
