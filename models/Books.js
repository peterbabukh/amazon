var mongoose = require('../lib/mongoose');

// this schema is used to create a collection of books, stored in db
var Book = require('./Book').schema;

var Schema = mongoose.Schema;

var schema = new Schema({

    books: [Book]

});

exports.Books = mongoose.model('Books', schema);