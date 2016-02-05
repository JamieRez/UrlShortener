var express = require('express');
var app = express();
var routes = require('./app/routes/index.js');
var models = require('./app/models/urls.js')
var mongoose = require('mongoose');
var short = require('./short.js');

mongoose.connect('mongodb://localhost:27017/urls');
var db = mongoose.connection;
    db.once('open', function(){
        console.log('dataBase has connected');
    });



