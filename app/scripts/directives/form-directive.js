'use strict';

angular.module('theBossApp')
  .directive('formDirective', ['FormService','$dialogs', function (FormService,$dialogs) {

    var linker = function(scope, element,attrs) {
        scope.superuser = true;
        scope.oneAtATime = true;
        scope.loadingList = false;
        scope.editmode = false;
        scope.formName = attrs.formname;
        scope.alerts = [];
        FormService.form(scope.formName).then(function(form) {
          if (form) {
            scope.form = form; 
          }else{
              var dlg = $dialogs.confirm('Please Confirm','There is not form created yet with name '+scope.formName+', do you want to create it?');
              dlg.result.then(function(btn){
                  scope.form = {
                      form_name: scope.formName,
                      module: scope.formName,
                      form_fields:[]
                  };
                  FormService.saveForm($scope.form,function(res){
                        $scope.alerts = [
                            { type: 'danger', msg: 'There was an error saving the form'},
                            { type: 'danger', msg: res},
                            ];    
                    },function(res){
                        $scope.alerts.push({msg: "Added new field!"});
                        $scope.editmode = false;
                    });
              },function(btn){
              });
          }
        });        
    };
	return {
            controller: function($scope) {
            $scope.submit = function(){
                $scope.loadingList = true;
                $scope.form.created_by = $scope.user;
                FormService.submit($scope.formValueId,$scope.form,function(res){
                    //error cb
                    $scope.alerts.push({type:'danger', msg: res});

                   },function(res){
                        FormService.loadingList = true;
                        //success cb
                        $scope.alerts.push({type:'success', msg: "Form was saved with success"});

                })
            };
           

            $scope.$watch(function() { return FormService.editedModelId}, function(newData,oldData) { 
             if(newData && newData !== oldData){
                
                FormService.editFormById(newData,$scope.formName, function(res){
                    $scope.formValueId = res.formValueId;
                    $scope.form = res.form;
                });
             }
            },true);

           

            $scope.reset = function(){
                angular.forEach($scope.form.form_fields,function(field,key){
                    field.field_value = '';
                });
                $scope.alerts.push({type:'success', msg: "Form was reset success"});
            }

            
            $scope.addField = function(){
                
                var new_field = {
                    field_title: 'New Field',
                    field_type: 'textfield'
                };
                // if(field_type==='composite-element'){
                //     new_field.composite = [];
                // }
                $scope.form.form_fields.push(new_field);
                FormService.saveForm($scope.form,function(res){
                        $scope.alerts = [
                            { type: 'danger', msg: 'There was an error saving the form'},
                            { type: 'danger', msg: res},
                            ];    
                    },function(res){
                        $scope.alerts.push({msg: "Added new field!"});
                        $scope.editmode = false;
                    });
                
            }

            $scope.deleteField = function(field){
                var dlg = $dialogs.confirm('Please Confirm','Are you sure you want to delete '+field.field_title+' ?');
                dlg.result.then(function(btn){
                    for(var i = 0; i < $scope.form.form_fields.length; i++){
                        if($scope.form.form_fields[i]._id == field._id){
                            $scope.form.form_fields.splice(i, 1);
                            break;
                        }
                    }
                },function(btn){
                });
            }
        
           
        },
        templateUrl: './views/directive-templates/form/form.html',
        restrict: 'EA',
        scope: {
           // formName:'=formName'
        },
        link: linker

    };
  }]);
