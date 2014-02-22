'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Form Schema
 */
var FormValueSchema = new Schema({
  form_name: String,
  module: String,
  last_updated: Date,
  form_values: [{
  	field_id: Number,
  	field_value: String
  }]
});


mongoose.model('FormValue', FormValueSchema);
