'use strict';

angular.module('theBossApp')
  .directive('list', ['FormService', function (FormService) {
    var loadLatest = function(nrOfRecords,formName,scope){
        FormService.loadLatest(nrOfRecords,formName,function(list){
            processTheList(scope,list);
        });
    };
    var processTheList = function(scope,list){
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
    };

    return {
        controller: function($scope){
            $scope.edit = function(item){
                FormService.editedModelId = item.id;
            };
            $scope.showLast = function(range){
                var query = {
                    form_name: $scope.formName,
                    last_updated: {'$gt': new Date(FormService.getDateRangeSinceNow(range))} 
                };

                FormService.query(query, function(list){
                    processTheList($scope,list);
                })
            }
        },
        
        templateUrl: './views/directive-templates/list.html',
        restrict: 'E',
        scope: {
            formName:'@formname',
            numberOfRecords:'@nroffrecords'
        },
        link: function(scope, element,attrs){
            loadLatest(scope.numberOfRecords,scope.formName,scope);
            
            scope.$watch(function() { return FormService.submitted;}, function(data) { 
              if(data){
                loadLatest(scope.numberOfRecords,scope.formName,scope);
                FormService.submitted = false;
              }
            });

        }
    };
  }]);
