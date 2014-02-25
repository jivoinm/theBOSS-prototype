'use strict';

var mongoose = require('mongoose'),
    Form = mongoose.model('Form'),
    FormValue = mongoose.model('FormValue');

/**
 * Create form
 */
exports.save = function (req, res, next) {
  var newForm = new Form();
  newForm.init(req.body);
  newForm.provider = 'local';
  if(newForm._id){
    delete req.body._id;
    Form.update({form_name:req.body.form_name},req.body, {upsert:true}, function(err) {
          if (err) return res.json(400, err);
          res.send(newForm);
         });
  }else{
    newForm.save(function(err) {
      if (err) return res.json(400, err);
      res.send(newForm);
     });
  }
};

exports.load = function (req,res,next) {
  var name = req.params.form_name;
  
  Form.findOne({form_name:name}, function (err, form) {
    if (err) return next(err);
    if (!form) return res.send(null);
    res.send(form);
  });
};

exports.loadAll = function (req,res,next){
  Form.find({},function(err,forms){
     if(err) return next(err);
     res.send(forms);
  });
};

// Save Submitted form
exports.submit = function(req,res,next){
  if(req.body._id){
    console.log('update');
    //update
    FormValue.findById(req.body._id,function(err,formValue){
      if (err) return next(err);
      if (!formValue) return res.send(404);
      formValue.form_fields = req.body.form_fields;
      formValue.update(function(err){
        if(err) return res.json(400,err);
        res.json(formValue);
      })

    });
  }else{
    var newFormValue = new FormValue(req.body);
    newFormValue.provider = 'local';
    newFormValue.save(function(err) {
      console.log('save');
      console.log(err);
      if (err) return res.json(400, err);
      res.send(newFormValue);
     });
  }
};

exports.lastest = function(req,res,next){
  var number_of_records = req.params.number_of_records || 10;
  var form_name = req.params.form_name;
  FormValue.find({form_name:form_name}).sort({_id:-1}).limit(number_of_records).exec(function(err,form_values){
    if(err) return res.json(400,err);
    res.json(form_values);
  });
};

exports.editFormById = function(req,res,next){
  var id = req.params.id;
  var form_name = req.params.form_name;
  FormValue.findById(id,function(err,formValue){
    if(err) return res.json(400,err);
    //load form
    Form.findOne({form_name:form_name}, function (err, form) {
      if (err) return next(err);
      //create form and prefill the values
      form.form_fields.forEach(function (value,key) {
        value.field_value = formValue.form_fields[key].field_value;
      })
      console.log(form);
      res.send(form);
  });
  })
};