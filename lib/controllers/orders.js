'use strict';

var mongoose = require('mongoose'),
    Form = mongoose.model('Form'),
    Order = mongoose.model('Order'),
    FormValue = mongoose.model('FormValue');

exports.save = function (req, res, next){
	//process order
	res.send('salud save this');
};

exports.lastTen = function (req, res,next){
	//load last ten
	Order.find({},{},{limit:10,sort:{_id:-1}},function(err,coll){
		if (err) return next(err);
		res.json(coll);
	});
}
