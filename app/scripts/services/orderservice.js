'use strict';

angular.module('theBossApp')
  .service('Orderservice', function Orderservice($http) {
  	return {
  		getLastTen: function(){
  			return $http.get('/api/order/lastTen').then(function (response) {
            	return response.data;
            });
  		},
  		load: function(id){
  			//load existing form
  			return $http.get('api/order/'+id).then(function (response){
  				return populateModel(response.data);
  			});
  		},
      populateModel: function (form){
        return form;
      }
  	};


  });
