'use strict';

angular.module('theBossApp')
  .service('FormService', ['$http','usSpinnerService','$rootScope','$log', function FormService($http,usSpinnerService,$rootScope,$log) {

    return {
        loadingList: false,
        editedModelId: 0,
        fields:[
            {
                name : 'textfield',
                value : 'Textfield',
                actions: [
                    {
                        name: 'Add formula',
                        callback: 'calculate'
                    }
                ]
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
                value : 'Dropdown List',
                actions: [
                    {
                        name: 'Depends on',
                        callback: 'updateSelected'
                    }
                ]
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
            },
            {
                name : 'composite',
                value : 'Composite Element'
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

        query: function (query,cbSuccess){
            var json = JSON.stringify(query, function(key, value) {
                if (value.constructor === RegExp) return value.toString();
                return value;
            });
            return $http.post('/api/formvalues/',json).then(function(response) {
                cbSuccess(response.data);
            
            })
        },

        editFormById: function (id,form_name,cbSuccess){
            return $http.get('/api/form/'+id+'/'+form_name).then(function(response) {
                cbSuccess(response.data);
            })   
        },

        deleteFormValue: function (id,cbSuccess) {
            return $http.delete('/api/formValue/'+id).then(function(response) {
                cbSuccess(response.data);
            })
        },

        saveForm: function(form,cbError,cbSuccess) {
            return $http.post('/api/form', form).success(function (response) {
                cbSuccess(response.data);
            }).error(function (response){
                cbError(response.err);
            });
        },
        saveField: function(field,cbError,cbSuccess) {
            $log.info('field '+field);
            return $http.post('/api/form/field', field).success(function (response) {
                cbSuccess(response.data);
            }).error(function (response){
                cbError(response.err);
            });
        },
        submit: function(formValueId,form,cbError,cbSuccess){
            
            var formValue = {
                formValueId:formValueId,
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
                    field_type: value.field_type
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
        },

        getDateRangeSinceNow: function(range){
            var now = new Date();
            switch (range) {
              case 'today':
                range = new Date(now.setDate(now.getDate()-1));
              case 'week':
                range = new Date(now.setDate(now.getDate()-7));
              case 'month':
                range = new Date(now.setMonth(now.getMonth()-1));
              case 'year':
                range = new Date(now.setYear(now.getYear()-1));
              case 'default':
                range = now;
            }
            return range;
        }
    };
}]);
