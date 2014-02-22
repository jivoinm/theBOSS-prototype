'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var OrderSchema = new Schema({
  	customer: {
  			name: String,
  			address: String,
  			postal_code: String,
  			city: String,
  			province: String,
  			country: String
  		},
  	projects: [{
  		name: String,
  		details: {type: Array, default:[]}
  	}]
});

mongoose.model('Order', OrderSchema);
