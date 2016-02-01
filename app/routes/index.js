var express = require('express');
var app = express();
var validUrl = require('valid-url');
var short = require('../../short.js');


app.get('/', function(req,res){
    res.send("Dont worry about it");
});

app.get('/urls', function(req,res){
    res.send(short.getUrls());
});

app.route('/new/*').get(function(req,res){
     if(validUrl.isUri(req.params[0])){
         res.send(short.getNewUrl(req.params[0]));
     }else{
         res.send({'Error' : 'Invalid Url'});
     }
});

app.listen(8080, function(req,res){
    console.log("Listening on port 8080");
});