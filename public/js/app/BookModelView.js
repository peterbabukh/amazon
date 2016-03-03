define( function(require) {

    'use strict';

    var Backbone = require('backbone');
    var s = require('underscore.string');
    var i18n = require('i18n!../../js/nls/locales');
    var bookTmpl = require('text!../../templates/bookTmpl.html');

    var BookItemView = Backbone.View.extend({

        tagName: 'TR',

        initialize: function() {
            this.model.on('destroy', this.remove, this);
            this.model.on('change', this.render, this);
        },

        events: {

        },

        template: _.template( bookTmpl ),

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }

    });

    return BookItemView;

});