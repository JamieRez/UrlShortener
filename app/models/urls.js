var mongoose = require('mongoose');
var schema = mongoose.Schema;

var urlSchema = new schema ({
    original : String,
    short : String,
    num : Number
});

var url = mongoose.model('url' , urlSchema);

module.exports.url = url;