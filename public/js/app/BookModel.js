define( function(require) {

    'use strict';

    var Backbone = require('backbone');

    var BookModel = Backbone.Model.extend({

        urlRoot: '/books'

    });

    return BookModel;

});