var crypto = require('crypto');
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

// this schema is used for password forgot to create temporary user with token data
var schema = new Schema({

    email: {
        type: String
    },

	hashedPassword: {
		type: String
	},
	 
	salt: {
		type: String
	},
	 
	token: {
		type: String
	},
	
	validityTime: {
		type: Date
	}

});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
};

exports.User = mongoose.model('TempUser', schema);
