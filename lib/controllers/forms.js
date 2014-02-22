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
  var newFormValue = new FormValue(req.body);
  newFormValue.provider = 'local';
  if(newFormValue._id){
    delete req.body._id;
    Form.update({_id:newFormValue._id},req.body, {upsert:true}, function(err) {
          if (err) return res.json(400, err);
          res.send(newFormValue);
         });
  }else{
    newFormValue.save(function(err) {
      if (err) return res.json(400, err);
      res.send(newFormValue);
     });
  }
};
