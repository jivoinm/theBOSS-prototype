'use strict';

angular.module('theBossApp')
  .directive('fieldDirective', ['$http','$compile','$modal','$log', function ($http,$compile,$modal,$log) {
        var getTemplateUrl = function(field) {
            var type = field.field_type;
            var templateUrl = '/views/directive-templates/field/'+type+'.html';
            
            return templateUrl;
        }

        var linker = function(scope, element) {
            // GET template content from path
            var templateUrl = getTemplateUrl(scope.field);
            switch(scope.field.field_type) {
                case 'date':
                    scope.show_calendar = false;
                    scope.openCalendar = function($event){
                        $event.preventDefault();
                        $event.stopPropagation();

                        scope.show_calendar = true;
                    }
                    break;
            }

            $http.get(templateUrl).success(function(data) {
                element.html(data);
                $compile(element.contents())(scope);
            });
        }

        return {
            controller: function($scope){
                $scope.open = function (field) {
                    var modalInstance = $modal.open({
                      templateUrl: './views/directive-templates/field/field-setup.html',
                      controller: FieldSetupCtrl,
                      resolve: {
                        selectedfield: function () {
                            $log.info('Put field to modal: ' + field.field_title);
                            return field;
                        }
                      }
                    });
                
                    modalInstance.result.then(function (selectedfield) {
                        $log.info('Put field to modal: ' + selectedfield.field_title);
                        $scope.field = selectedfield;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };
            },
            template: '<div>{{field}}</div>',
            restrict: 'E',
            scope: {
                field:'=',
                editmode:'='
            },
            link: linker
        };
  }]);


var FieldSetupCtrl = function ($scope, $modalInstance,selectedfield) {
  $scope.selectedfield = selectedfield;
  $scope.ok = function () {
    $modalInstance.close($scope.selectedfield);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};