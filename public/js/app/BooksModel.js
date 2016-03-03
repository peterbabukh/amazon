define( function(require) {

	'use strict';

	var Backbone = require('backbone');
	var BooksCollection = require('app/BooksCollection');

	var BooksModel = Backbone.Model.extend({

		urlRoot: '/books',

		defaults: {
			books: new BooksCollection()
		},

		// prevents caching of fetched data
		fetch: function (options) {
			options = options || {};
			options.cache = false;
			return Backbone.Model.prototype.fetch.call(this, options);
		},

		// parse the response to get clean collection
		parse: function(response) {
			response.books = new BooksCollection(response.books);
			return response;
		}

	});

	return BooksModel;

});