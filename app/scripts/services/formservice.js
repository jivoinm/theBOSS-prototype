'use strict';

angular.module('theBossApp')
  .service('FormService', function FormService($http) {

    return {
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
        submit: function(form_fields,cbError,cbSuccess){
            console.log(form_fields);
            return $http(
                {
                    url: '/api/submitform',
                    method: 'POST',
                    data: form_fields,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (response) {
                    cbSuccess(response.data);
            }).error(function (response){
                cbError(response.err);
            });
        }
    };
});
