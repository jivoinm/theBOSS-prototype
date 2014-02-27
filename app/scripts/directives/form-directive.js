'use strict';

angular.module('theBossApp')
  .directive('formDirective', function (FormService,$dialogs) {
    var linker = function(scope, element,attrs) {
        scope.field_types = FormService.fields;
        scope.superuser = true;
        scope.oneAtATime = true;
        scope.submitted = false;
        scope.formName = attrs.formname;
        FormService.form(attrs.formname).then(function(form) {
          if (form) {
            scope.form = form; 
          }  
        });        
    };
	return {
            controller: function($scope) {
            $scope.submit = function(){
                $scope.submitted = true;
                $scope.form.created_by = $scope.user;
                FormService.submit($scope.formValueId,$scope.form,function(res){
                    //error cb
                    $scope.alerts = [
                            { type: 'danger', msg: 'There was an error submitting the form'},
                            { type: 'danger', msg: res},
                            ];    

                   },function(res){
                        FormService.submitted = true;
                        //success cb
                        $scope.alerts = [
                            { type: 'success', msg: 'Form was saved with success'}
                            ];

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

            $scope.$watch('$last', function(newData,oldData) { 
             if(newData && newData !== oldData){
                console.log('loaded last');
                $scope.loaded = true;
             }
            },true);


            $scope.cancel = function(){
                alert('Form canceled..');
            }

            $scope.save = function(){
                if(!$scope.form || !$scope.form.form_fields || $scope.form.form_fields.length == 0) {
                    $scope.alerts = [{ type: 'danger', msg: 'No fields added yet, please add fields to the form before saving.'}];
                } else {
                    FormService.save($scope.form,function(res){
                        $scope.alerts = [
                            { type: 'danger', msg: 'There was an error saving the form'},
                            { type: 'danger', msg: res},
                            ];    
                    },function(res){
                        $scope.alerts = [
                            { type: 'success', msg: 'Form was saved with success'}
                            ];
                        $scope.editmode = false;
                    });
                }
            }


            $scope.addField = function(event,field_type){
                
                var new_field = {
                    field_title: 'New Field',
                    field_type: field_type
                };
                $scope.form.form_fields.push(new_field);
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
        
            // add new option to the field
            $scope.addOption = function (field){
                if(!field.field_options)
                    field.field_options = new Array();

                var lastOptionID = 0;

                if(field.field_options[field.field_options.length-1])
                    lastOptionID = field.field_options[field.field_options.length-1].option_id;

                // new option's id
                var option_id = lastOptionID + 1;

                var newOption = {
                    "option_id" : option_id,
                    "option_title" : "Option " + option_id,
                    "option_value" : option_id
                };

                // put new option into field_options array
                field.field_options.push(newOption);
            }

            // delete particular option
            $scope.deleteOption = function (field, option){
                for(var i = 0; i < field.field_options.length; i++){
                    if(field.field_options[i].option_id == option.option_id){
                        field.field_options.splice(i, 1);
                        break;
                    }
                }
            }


            // decides whether field options block will be shown (true for dropdown and radio fields)
            $scope.showAddOptions = function (field){
                if(field && (field.field_type == "radio" || field.field_type == "dropdown"))
                    return true;
                else
                    return false;
            }
        },
        templateUrl: './views/directive-templates/form/form.html',
        restrict: 'EA',
        scope: {
           // formName:'=formName'
        },
        link: linker

    };
  });
