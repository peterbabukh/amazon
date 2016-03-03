var crypto = require('crypto');
var mongoose = require('../lib/mongoose');

var Book = require('./Book').schema;

var Schema = mongoose.Schema;

var schema = new Schema({

    books: [Book]

});

exports.User = mongoose.model('Books', schema);