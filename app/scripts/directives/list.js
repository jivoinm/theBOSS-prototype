'use strict';

angular.module('theBossApp')
  .directive('list', ['FormService','$filter','$dialogs', function (FormService,$filter,$dialogs) {
    var loadLatest = function(scope){
        scope.isCollapsed = true;
        FormService.loadLatest(scope.numberOfRecords,scope.formName,function(list){
            processTheList(scope,list);
        });
    };
    var processTheList = function(scope,list){
        scope.list = [];
            angular.forEach(list,function(value,key){
                var item_details = [];
                angular.forEach(value.form_fields,function(value,key){
                    if(key > 0 && value.field_value){
                        var fieldValue = value.field_type === 'date' ?
                            $filter('date')(value.field_value,'medium') :
                            value.field_value;

                        this.push({title:value.field_title, value:fieldValue});
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
            $scope.search = function(query){
                var query = {
                    'form_name': $scope.formName,
                    'form_fields': {'$elemMatch':{'field_value': query}}
                };

                FormService.query(query, function(list){
                    processTheList($scope,list);
                })
            };
            $scope.delete = function(field){
                var dlg = $dialogs.confirm('Please Confirm','Are you sure you want to delete '+field.value+' ?');
                dlg.result.then(function(btn){
                    FormService.deleteFormValue(field.id,function(res){
                        loadLatest($scope);
                        $scope.alerts = [
                            { type: 'success', msg: res}
                        ];
                    });
                },function(btn){
                });
            }
        },
        
        templateUrl: './views/directive-templates/list.html',
        restrict: 'E',
        scope: {
            formName:'@formname',
            numberOfRecords:'@nroffrecords'
        },
        link: function(scope, element,attrs){
            loadLatest(scope);
            
            scope.$watch(function() { return FormService.loadingList;}, function(data) {
              if(data){
                loadLatest(scope);
                FormService.loadingList = false;
              }
            });

        }
    };
  }]);
