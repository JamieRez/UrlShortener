var express = require('express');
var app = express();
var routes = require('./app/routes/index.js');
var models = require('./app/models/urls.js')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/urls');

function getNewUrl(orig){
    var db = mongoose.connection;
    db.once('open', function(){
        
        var url = models.url;
        var newUrl = new url({original : orig});
        
        url.count({original : orig}, function(err, count){
            if(err){throw err}
            if(count === 0){
                newUrl.save();
                console.log('created a new url for ' + orig);
            }else{
                console.log('failed to create a new url for ' + orig);
            }
        })
        db.close();
    })
}

function getUrls(){
    var db = mongoose.connection;
    db.once('open', function(){
        var url = models.url;
        url.find(function(err,urls){
            if(err){throw err}
            console.log(urls);
            return urls;
        });
        db.close();
    })
}


module.exports.getNewUrl = getNewUrl;
module.exports.getUrls = getUrls;