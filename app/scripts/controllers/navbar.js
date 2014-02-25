'use strict';

angular.module('theBossApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Order Fields',
      'link': '#/order-fields'
    }, {
      'title': 'Settings',
      'link': '#/settings'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  
  });
