'use strict';

angular.module('theBossApp')
  .controller('FormBuilderCtrl', function ($scope, $routeParams,FormService) {
    $scope.form = {};
    var formToLoad = $routeParams.form_name;
   // read form with given id
    FormService.form(formToLoad).then(function(form) {
    	if (form) {
    		$scope.form = form;	

    	}else{
    		// new form
		    $scope.form.form_id = 1;
		    $scope.form.form_fields = [];
            $scope.isNew = true;
    	}
        	
    });

    // preview form mode
    $scope.previewMode = true;
    
    $scope.createNewField = function (){
        return {
            types: FormService.fields,
            field_type: FormService.fields[0].name,
            };
    }

    $scope.addField = $scope.createNewField();
    $scope.addField.lastAddedID = $scope.form && $scope.form.form_fields
                                     ? $scope.form.form_fields.length : 0;

    // create new field button click
    $scope.addNewField = function(){
        // incr field_id counter
        $scope.addField.lastAddedID++;
        // put newField into fields array
        $scope.form.form_fields.push($scope.addField);
        $scope.addField = $scope.createNewField();
    }

    // deletes particular field on button click
    $scope.deleteField = function (field_id){
        for(var i = 0; i < $scope.form.form_fields.length; i++){
            if($scope.form.form_fields[i].field_id == field_id){
                $scope.form.form_fields.splice(i, 1);
                break;
            }
        }
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

    $scope.canAddFiled = function (){
        if($scope.addField.field_type && $scope.addField.field_title){
            return true;
        }
        return false;
    }
    // deletes all the fields
    $scope.reset = function (){
        $scope.form.form_fields.splice(0, $scope.form.form_fields.length);
        $scope.addField.lastAddedID = 0;
    }

 });
