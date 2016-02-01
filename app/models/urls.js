var mongoose = require('mongoose');
var schema = mongoose.Schema;

var urlSchema = new schema ({
    original : String,
    short : String
})

var url = mongoose.model('url' , urlSchema);

module.exports.url = url;