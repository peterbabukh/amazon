var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

// create the pattern for every single word model to be saved in db
var schema = new Schema({

    salesRank: {
        type: String
    },
    title: {
        type: String
    },
    img: {
        type: String
    },
    entry1: {
        type: Schema.Types.Mixed
    },
    entry2: {
        type: Schema.Types.Mixed
    },
    entry3: {
        type: Schema.Types.Mixed
    }
});

module.exports = mongoose.model('Book', schema);