var express = require('express');
var app = express();
var validUrl = require('valid-url');
var short = require('../../short.js');


app.get('/', function(req,res){
    res.send("Dont worry about it");
});

app.get('/urls', function(req,res){
    short.getUrls(function(urls){
        res.send(urls);
    });
});

app.route('/new/*').get(function(req,res){
     if(validUrl.isUri(req.params[0])){
         short.getNewUrl(req.params[0], function(url){
             var origUrl = url.original;
             var shortUrl = 'https://url-shortener-jamierez.c9users.io/' + url.num;
             res.json({original : origUrl , short : shortUrl});
         });
     }else{
         res.send({'Error' : 'Invalid Url'});
     }
});

app.route('/:num').get(function(req,res){
    short.numIsUsed(req.params.num , function(err, url){
        if(err){res.send(err)}else{
            res.redirect(url.original);
        }
    });
});

app.listen(8080, function(req,res){
    console.log("Listening on port 8080");
});