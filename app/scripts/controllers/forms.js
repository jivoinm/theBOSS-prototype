'use strict';

angular.module('theBossApp')
  .controller('FormsCtrl', function ($scope, $http,FormService) {
  	
   FormService.load().then(function(forms){
   		$scope.forms = forms;
   });
  });
