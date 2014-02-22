'use strict';

angular.module('theBossApp')
  .controller('FormLoaderCtrl', function ($scope,$routeParams, FormService) {

  	var formToLoad = $routeParams.form_name;
    FormService.form(formToLoad).then(function(form) {
		if (form) {
			$scope.form = form;	
		}else{
			 $scope.alerts = [{ type: 'danger', msg: 'Couldn\'t load the form '+formToLoad}];    
		}
    });

    $scope.previewMode = false;
  });
