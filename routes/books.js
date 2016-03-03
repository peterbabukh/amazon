var Books = require('../models/Books').Books;

exports.get = function(req, res) {

    Books.find({}, function (err, books) {
        if (err) return next(err);

        res.json(books);
    });

};
