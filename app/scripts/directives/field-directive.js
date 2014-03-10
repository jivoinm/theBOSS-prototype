'use strict';

angular.module('theBossApp')
  .directive('fieldDirective', ['$http','$compile','$modal','$log','FormService', function ($http,$compile,$modal,$log,FormService) {
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
            controller: function($scope,$element){
                $scope.open = function (field) {
                    var modalInstance = $modal.open({
                      templateUrl: './views/directive-templates/field/field-setup.html',
                      controller: FieldSetupCtrl,
                      resolve: {
                        selectedfield: function () {
                            $log.info('Put field to modal: ' + field.field_title);
                            return field;
                        },
                        field_element: function(){
                            $log.info('element '+$element);
                            return $element;
                        }
                      }
                    });
                
                    modalInstance.result.then(function (selectedfield) {
                        $scope.field = selectedfield;
                        linker($scope,$element);
                    });
                };

            },

            template: '{{field}}',
            restrict: 'A',
            scope: {
                field:'=',
                editmode:'='
            },
            link: linker
        };
  }]);


var FieldSetupCtrl = ['$scope', '$modalInstance','selectedfield','FormService', function ($scope, $modalInstance,selectedfield,FormService) {
    $scope.selectedfield = selectedfield;
    $scope.field_types = FormService.fields;
    $scope.alerts = [];
     // add new option to the field
    $scope.addOption = function (field){
        if(!field.field_options)
            field.field_options = new Array();

        var lastOptionID = 0;

        if(field.field_options[field.field_options.length-1])
            lastOptionID = field.field_options[field.field_options.length-1].id;

        // new option's id
        var option_id = lastOptionID + 1;

        var newOption = {
            "id" : option_id,
            "value" : "Option " + option_id,
            "color" : ""
        };

        // put new option into field_options array
        field.field_options.push(newOption);
    }

    // delete particular option
    $scope.deleteOption = function (field, option){
        for(var i = 0; i < field.field_options.length; i++){
            if(field.field_options[i].id == option.id){
                field.field_options.splice(i, 1);
                break;
            }
        }
    }


    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (field){
        if(field && (field.field_type === "radio" || field.field_type === "dropdown"))
            return true;
        else
            return false;
    }

    $scope.IsComposite = function(field){
        if(field && (field.field_type === "composite")){
            return true;
        }
        return false;
    }
  
  $scope.ok = function () {
    //validate the form here
    FormService.saveField($scope.selectedfield,function(res){
            $scope.alerts = [
                { type: 'danger', msg: 'There was an error saving the field'},
                { type: 'danger', msg: res},
                ];    
        },function(res){
            $scope.alerts = [
                { type: 'success', msg: 'Field was saved with success'}
                ];
            $scope.editmode = false;
        });
    
    $modalInstance.close($scope.selectedfield);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}];