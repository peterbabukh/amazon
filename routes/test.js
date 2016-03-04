var Books = require('../models/Books').Books;

// sends books collection upon books.fetch
exports.get = function(req, res) {

    Books.find({}, 'books.entry3', function (err, books) {
        if (err) return next(err);

        res.json(books);
    });

};
