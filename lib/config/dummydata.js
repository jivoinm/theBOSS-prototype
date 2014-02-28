'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Form = mongoose.model('Form'),
  FormValue = mongoose.model('FormValue');

/**
 * Populate database with sample application data
 */

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});

FormValue.find({}).remove();
Form.find({}).remove(function(){
  Form.create({
    provider: 'local',
    form_name: 'Order',
    module: 'Orders',
    form_fields: [
      {
        field_id: 1,
        field_title: 'Customer name',
        field_type: 'textfield',
        field_require: true
      },
      {
        field_id: 2,
        field_title: 'Date required',
        field_type: 'date',
        field_require: false
      }
    ]
  },function() {
      console.log('finished populating forms');
    });  
});