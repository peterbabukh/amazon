var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

// creates the pattern for every single book model to be saved in db
var schema = new Schema({

    salesRank: {
        type: String,
        default: '##'
    },
    title: {
        type: String,
        default: 'Not available'
    },
    img: {
        type: String,
        default: 'Not available'
    },
    entry1: {
        type: Schema.Types.Mixed,
        default: {
            rank: '##',
            ladder: ''
        }
    },
    entry2: {
        type: Schema.Types.Mixed,
        default: {
            rank: '##',
            ladder: ''
        }
    },
    entry3: {
        type: Schema.Types.Mixed,
        default: {
            rank: '##',
            ladder: ''
        }
    }
});

module.exports = mongoose.model('Book', schema);