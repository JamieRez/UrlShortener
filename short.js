var express = require('express');
var routes = require('./app/routes/index.js');
var models = require('./app/models/urls.js')
var mongoose = require('mongoose');
var complete = false;



function getNewUrl(orig, callbackFunc){
        var url = models.url;
        var newUrl = new url({original : orig});
        
        
        url.count({original : orig}, function(err, count){
            if(err){throw err}
            if(count === 0){
                console.log('created a new url for ' + orig);
                newUrl.save();
                
                url.count(function(err,count){
                    if(err){throw err}
                        newUrl.num = count;
                        newUrl.save();
                        url.find({original : orig} , function(err,urls){
                            if(err){throw err}
                            console.log(urls);
                            callbackFunc(urls[0]);
                        });
                });
            }else{
                console.log('failed to create a new url for ' + orig);
                url.find({original : orig} , function(err,urls){
                    if(err){throw err}
                    console.log(urls);
                    callbackFunc(urls[0]);
                });
            }
        });
        
                
                
}

function getUrls(callback){
    
        var url = models.url;
        //url.remove(function(){});
        url.find(function(err,urls){
            if(err){throw err}
            callback(urls);
        });
}

function numIsUsed(myNum, callback){
    var url = models.url;
    url.count({num : myNum} , function(err,count){
        if(err) throw err;
        if(count === 0){
            callback('Could Not Find URL for that ID');
        }else{
            url.find({num : myNum}, function(err, urls){
               if(err) throw err;
               callback(false, urls[0]);
            });
        }
    });
}

module.exports.getNewUrl = getNewUrl;
module.exports.getUrls = getUrls;
module.exports.numIsUsed = numIsUsed;

