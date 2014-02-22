'use strict';

angular.module('theBossApp')
  .controller('OrderCtrl', function ($scope, $routeParams, Orderservice,FormService) {
  	$scope.previewMode = false;
  	//load orders to show in the list
  	Orderservice.getLastTen(function(list){
  		$scope.list = list;
  	});
  	var orderForm = {};
  	var orderId = $routeParams['id'];
  	
  });
