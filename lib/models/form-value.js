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
	form_fields: {type: Array, default:[]}
});


mongoose.model('FormValue', FormValueSchema);
