define( function(require) {

	'use strict';

	var Backbone = require('backbone');
	var BookModel = require('app/BookModel');

	var BooksCollection = Backbone.Collection.extend({

		model: BookModel,

		url: '/books',

		comparator: function(model) {
			return model.get('title');
		},

		// prevents caching of fetched data
		fetch: function (options) {
			options = options || {};
			options.cache = false;
			return Backbone.Collection.prototype.fetch.call(this, options);
		},

		// handle success / error when fetch() fires
		fetchCollection: function () {

			var self = this;

			this.fetch({
				reset: true,
				success: function (collection, response, options) {
					// one can pass here additional options to the event one triggers
					self.trigger('successOnFetch');
				},
				error: function (collection, response, options) {
					// one can pass here additional options to the event one triggers
					self.trigger('errorOnFetch');
				}
			});

		}


	});

	return BooksCollection;

});