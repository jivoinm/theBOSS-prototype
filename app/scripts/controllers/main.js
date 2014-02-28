'use strict';

angular.module('theBossApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.$parent.pageHeader = 'Dashboard';
    $scope.uiConfig = {
      calendar:{
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

  }]);
