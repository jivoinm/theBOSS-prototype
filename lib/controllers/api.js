'use strict';

var mongoose = require('mongoose'),
    Form = mongoose.model('Form');

exports.menus = function(req,res,next){
	var menu = [
    {
        "name": "Dashboard",
        "route": "/"
    },
    {
        "name": "Orders",
        "route": "/order"
    },
    {
        "name": "Materials",
        "route": "/material"
    },
    {
        "name": "Calendar",
        "route": "/calendar"
    }
    ];

//    Form.find({},function(err,forms){
//        if(err) return res.json(err);
//        forms.forEach(function(value,key){
//            menu.push({"name":value.form_name,"route":"/"+value.form_name.toLowerCase()});
//        });
//        res.json(menu);
//    });
    res.json(menu);
};

exports.messages = function(req,res,next){
	var messages = [
    {
        "id": 123456,
        "name": "John Smith",
        "createdAt": 1392263439506,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt in risus et scelerisque. Proin et est a felis euismod ultrices."
    },
    {
        "id": 123457,
        "name": "John Smith",
        "createdAt": 1392263439506,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt in risus et scelerisque. Proin et est a felis euismod ultrices."
    },
    {
        "id": 123458,
        "name": "John Smith",
        "createdAt": 1392263439506,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt in risus et scelerisque. Proin et est a felis euismod ultrices."
    }
	];
	res.json(messages);
};

exports.tasks = function(req,res,next){
	var tasks = [
    {
        "name": "Task 1",
        "min": 0,
        "max": 100,
        "now": 40,
        "status": "success"
    },
    {
        "name": "Task 2",
        "min": 0,
        "max": 100,
        "now": 20,
        "status": "info"
    },
    {
        "name": "Task 3",
        "min": 0,
        "max": 100,
        "now": 60,
        "status": "warning"
    },
    {
        "name": "Task 4",
        "min": 0,
        "max": 100,
        "now": 80,
        "status": "danger"
    }
];
	res.json(tasks);
};

exports.alerts = function(req,res,next){
	var alerts = [
    {
        "type": "comment",
        "content": "New Comment",
        "lastTime": 1392263439506
    },
    {
        "type": "follower",
        "content": "3 New Followers",
        "lastTime": 1392263439506
    },
    {
        "type": "message",
        "content": "Message Sent",
        "lastTime": 1392263439506
    },
    {
        "type": "task",
        "content": "New Task",
        "lastTime": 1392263439506
    },
    {
        "type": "action",
        "content": "Server Rebooted",
        "lastTime": 1392263439506
    }
];
	res.json(alerts);
};