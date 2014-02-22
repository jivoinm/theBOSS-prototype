'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Form Schema
 */
var FormSchema = new Schema({
  form_name: String,
  module: String,
  last_updated: Date,
  form_fields: [{
  	field_id: Number,
  	field_title: String,
  	field_type: String,
  	field_value: String,
  	field_require: Boolean,
    field_options: {type: Array, default:[]}
  }]
});


FormSchema.pre('save', function (form,next) {
  form.last_updated = new Date();
  console.log('save->'+form.last_updated);
  next();
});

FormSchema.pre('update', function (form,next) {
  form.last_updated = new Date();
  console.log('update->'+form.last_updated);
  next();
});

/**
 * Validations
 */
// FormSchema.path('awesomeness').validate(function (num) {
//   return num >= 1 && num <= 10;
// }, 'Awesomeness must be between 1 and 10');
// FormSchema.path('module').validate(function (module){
//   return !module;
// }, 'Module must be entered');

mongoose.model('Form', FormSchema);
