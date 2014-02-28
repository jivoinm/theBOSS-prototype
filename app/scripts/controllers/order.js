'use strict';

angular.module('theBossApp')
  .controller('OrderCtrl', ['$scope', '$routeParams','Orderservice','FormService', function ($scope, $routeParams, Orderservice,FormService) {
	$scope.$parent.pageHeader = 'Orders';  	
  	
  }]);
