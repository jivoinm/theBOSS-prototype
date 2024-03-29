'use strict';

var mongoose = require('mongoose'),
    Form = mongoose.model('Form'),
    FormValue = mongoose.model('FormValue');

/**
 * Create form
 */
exports.saveForm = function (req, res, next) {
  var newForm = new Form();
  newForm.init(req.body);
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

exports.saveField = function (req, res, next) {
  var fieldId = req.body._id;
  delete req.body._id;
  var updateJson = {};
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      updateJson['form_fields.$.'+key] = req.body[key];
    }
  }

  Form.update({form_fields: {'$elemMatch': {'_id': mongoose.Types.ObjectId(fieldId)}}}, {'$set':updateJson}, {upsert:true}, function(err, fieldRes){
    if(err) return next(err);
    if(!fieldRes) res.send(null);
    res.send(fieldRes);
  });
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
  if(req.body.formValueId){
    console.log('update');
    //update
    FormValue.update({_id:req.body.formValueId}, req.body,{upsert:true}, function(err) {
          if (err) return res.json(400, err);
          res.send(req.body);
         });

  }else{
    var newFormValue = new FormValue(req.body);
    newFormValue.save(function(err) {
      if (err) return res.json(400, err);
      res.send(newFormValue);
     });
  }
};

exports.latest = function(req,res,next){
  var number_of_records = req.params.number_of_records || 10;
  var form_name = req.params.form_name;
  FormValue.find({form_name:form_name}).sort({_id:-1}).limit(number_of_records).exec(function(err,form_values){
    if(err) return res.json(400,err);
    res.json(form_values);
  });
};

exports.formValueQuery = function(req,res,next){
  var number_of_records = req.params.number_of_records || 10;
  var query = req.body;
  console.log(query);
  FormValue.find(query).sort({_id:-1}).limit(number_of_records).exec(function(err,form_values){
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
      if (!form) return res.json(400,{err: 'no form found with name '+form_name});
      //create form and prefill the values
      form._id = id;
      form.form_fields.forEach(function (value,key) {
          if(formValue.form_fields.length>key){
              value.field_value = formValue.form_fields[key].field_value;
          }
      })
      var editedForm = {formValueId:id, form:form};
      res.json(editedForm);
  });
  })
};

exports.deleteFormValue = function(req,res,next){
    var id = req.params.id;
    FormValue.findById(id).remove(function(err){
        if(err) return res.json(400,err);
        res.json({msg:'Deleted with success'});
    });
};