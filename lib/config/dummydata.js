'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  FormObj = mongoose.model('Form'),
  FormValue = mongoose.model('FormValue');

/**
 * Populate database with sample application data
 */

//FormValue.find({}).remove(function(){});
FormObj.find({}).remove(function(){
  FormObj.create({
    form_name: 'Order',
    module: 'Orders',
    last_updated: new Date(),
    form_fields: [
      {
        field_title: 'Customer name',
        field_type: 'textfield',
        field_require: true
      },
      {
        field_title: 'Date required',
        field_type: 'date',
        field_require: false
      }
    ]
  },function(err) {
      if(err) console.log('error: '+err);
      console.log('finished populating forms');
    });  
});

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