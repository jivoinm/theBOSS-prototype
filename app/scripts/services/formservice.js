'use strict';

angular.module('theBossApp')
  .service('FormService', function FormService($http) {

    return {
        submitted: false,
        editedModelId: 0,
        fields:[
            {
                name : 'textfield',
                value : 'Textfield'
            },
            {
                name : 'email',
                value : 'E-mail'
            },
            {
                name : 'password',
                value : 'Password'
            },
            {
                name : 'radio',
                value : 'Radio Buttons'
            },
            {
                name : 'dropdown',
                value : 'Dropdown List'
            },
            {
                name : 'date',
                value : 'Date'
            },
            {
                name : 'textarea',
                value : 'Text Area'
            },
            {
                name : 'checkbox',
                value : 'Checkbox'
            },
            {
                name : 'hidden',
                value : 'Hidden'
            }
        ],
        form: function (form_name) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get('/api/form/'+form_name).then(function (response) {
               	return response.data;
             });
        },
        load: function (){
            return $http.get('/api/form').then(function(response) {
                return response.data;
            })
        },
        loadLatest: function (number_of_records,form_name,cbSuccess){
            return $http.get('/api/formvalues/'+number_of_records+'/'+form_name).then(function(response) {
                cbSuccess(response.data);
            })
        },

        editFormById: function (id,form_name,cbSuccess){
            return $http.get('/api/form/'+id+'/'+form_name).then(function(response) {
                cbSuccess(response.data);
            })   
        },
        save: function(form,cbError,cbSuccess) {
            return $http(
                {
                    url: '/api/form',
                    method: 'POST',
                    data: form,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (response) {
                    cbSuccess(response.data);
            }).error(function (response){
                cbError(response.err);
            });
        },
        submit: function(form,cbError,cbSuccess){
            
            var formValue = {
                form_name:form.form_name,
                module:form.module,
                created_by: form.created_by,
                last_updated: new Date(),
                form_fields: []
            };
            angular.forEach(form.form_fields,function(value,key){
                this.push({
                    field_title: value.field_title,
                    field_value: value.field_value,
                });
            },formValue.form_fields);
            return $http(
                {
                    url: '/api/submitform',
                    method: 'POST',
                    data: formValue,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (response) {
                    cbSuccess(response.data);
            }).error(function (response){
                cbError(response.err);
            });
        }
    };
});