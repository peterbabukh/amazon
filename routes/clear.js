var Books = require('../models/Books').Books;

// used for testing purposes
// TODO: this route to be removed
exports.get = function(req, res) {

    Books.remove({}, function (err) {
        if (err) return next(err);

        Books.find({}, function (err, books) {
            if (err) return next(err);

            res.json(books);

        });

    });

};
