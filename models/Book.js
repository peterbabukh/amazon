var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

// create the pattern for every single word model to be saved in db
var schema = new Schema({

    salesRank: {
        type: String
    },
    title: {
        type: String
    }
});

module.exports = mongoose.model('Book', schema);