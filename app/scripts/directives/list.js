'use strict';

angular.module('theBossApp')
  .directive('list', function (FormService) {
    var loadLatest = function(nrOfRecords,formName,scope){
        FormService.loadLatest(nrOfRecords,formName,function(list){
            scope.list = [];
            angular.forEach(list,function(value,key){
                var item_details = [];
                angular.forEach(value.form_fields,function(value,key){
                    if(key > 0 && value.field_value){
                        this.push(value.field_title + ':' + value.field_value);    
                    }
                },item_details);

                this.push({
                    id: value._id,
                    title: value.form_fields[0].field_title,
                    value: value.form_fields[0].field_value,
                    details: item_details    
                })
            },scope.list);
        });
    };
    return {
        controller: function($scope){
            $scope.edit = function(item){
                FormService.editedModelId = item.id;
            }
        },
        
        templateUrl: './views/directive-templates/list.html',
        restrict: 'E',
        scope: {
            formName:'='
        },
        link: function(scope, element,attrs){
            loadLatest(attrs.nroffrecords,attrs.formname,scope);
            
            scope.$watch(function() { return FormService.submitted;}, function(data) { 
              if(data){
                loadLatest(attrs.nroffrecords,attrs.formname,scope);
                FormService.submitted = false;
              }
            });

        }
    };
  });
