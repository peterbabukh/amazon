define( function(require) {

    'use strict';

    var Backbone = require('backbone');
    var i18n = require('i18n!../../js/nls/locales');
    var homeTmpl = require('text!../../templates/homeTmpl.html');
    var tableTmpl = require('text!../../templates/tableTmpl.html');
    //var appHeaderTmpl = require('text!../../templates/appHeaderTmpl.html');
    //var AppHeaderView = require('app/AppHeaderView');
    var BooksCollection = require('app/BooksCollection');
    var BooksModel = require('app/BooksModel');
    var BookModelView = require('app/BookModelView');

    var Home = Backbone.View.extend({

        el: $('.content-box'),

        template: _.template( homeTmpl ),

        events: {
            'click .td-filter': 'sortTable',
            'click #get-amazon-btn': 'getAmazon'
        },

        initialize: function() {
            this.childViews = [];
            this.books = new BooksModel();
        },

        render: function() {
            var self = this;
            this.$el.html( this.template() );

            // fetches the books from db to create/update this.collection
            this.books.fetch({
                success: function (books, response, options) {

                    if ( response[0] && response[0].books ) {
                        self.collection = new BooksCollection( response[0].books );
                        self.collection.on('change', self.handleSuccess, self);
                        //self.listenTo(self.collection, 'successOnFetch', self.handleSuccess);
                        //self.listenTo(self.collection, 'errorOnFetch', self.handleError);
                    }

                },
                error: function (user, response, options) {
                    self.handleError();
                }
            }).done(function(){
                // checks if there are items in collection to move further on
                if(self.collection && self.collection.length) {
                    self.handleSuccess();
                } else {
                    return false;
                }

            });

			return this;
        },

        handleSuccess: function () {
            this.onClose();
            this.showBooks();

            //this.prependHeader();

        },

        handleError: function () {
            console.log( 'error during colection fetch' );
            window.location.reload();
        },

        // sends request to server to scrape data from Amazon
        getAmazon: function () {
            var self = this;

            // if in scraping progress - returns
            if ( $('#get-amazon-btn').attr('data-status') == 'clicked' ) {
                return;
            }

            // sets flag that the scraping process is on
            $('#get-amazon-btn').text('Please, wait! The data is being downloaded!')
                .attr('data-status', 'clicked');

            // sends ajax request
            $.ajax({
                url: "/amazon"
            })
                .done(function( msg ) {
                    self.render();
                });


        },

        // creates table with books data from the collection fetched
        showBooks: function() {

            this.$el.append(_.template( tableTmpl ) );

            this.collection.each(function(elem) {

                var bookModelView = new BookModelView( { model: elem } );

                // need it to remove this view upon removal of this.$el
                this.childViews.push( bookModelView );

                $('#book-list').append( bookModelView.render().el );
                
            }, this);
        },

        // prepends header. Not used in this APP yet
        prependHeader: function() {
            var appHeaderView = new AppHeaderView();
            // used prepend instead of append for further adaptive css purposes
            this.$el.prepend( appHeaderView.render().el );
            // need it to remove this view upon removal of this.$el
            this.childViews.push( appHeaderView );
        },

        // Removes children views and their children views from DOM and thus prevents memory leaks
        onClose: function() {
            _.each( this.childViews, function(view){
                if (view && view.close) {
                    view.close();
                }
            });
            this.childViews.length = 0;
        },

        // sorts the table of books displayed by changing the comparator and resorting the collection
        // TODO: find a better way for natural sorting of collection
        sortTable: function(event) {
            var self = this;
            event = event || window.event;
            var target,
                index;

            target = event.target || event.srcElement;
            target = $(target).closest('td');
            index = $(target)[0].cellIndex;

            switch( index ) {
                case 0:
                    return;
                case 1:
                    this.collection.comparator = function(model){
                        return model.get('title');
                    };
                    this.collection.sort();
                    break;
                case 2:
                    this.collection.comparator = function(model){
                        var str = model.get('salesRank').toString()
                            .split('')
                            .slice(1)
                            .join('')
                            .replace(/#/,"1000000");
                        var num = parseInt( str );
                        return num;
                    };
                    this.collection.sort();
                    break;
                case 3:
                    this.collection.comparator = function(model){
                        var str = model.get('entry1').rank.toString()
                            .split('')
                            .slice(1)
                            .join('')
                            .replace(/#/,"1000000");
                        var num = parseInt( str );
                        return num;
                    };
                    this.collection.sort();
                    break;
                case 4:
                    this.collection.comparator = function(model){
                        var str = model.get('entry2').rank.toString()
                            .split('')
                            .slice(1)
                            .join('')
                            .replace(/#/,"1000000");
                        var num = parseInt( str );
                        return num;
                    };
                    this.collection.sort();
                    break;
                case 5:
                    this.collection.comparator = function(model){
                        var str = model.get('entry3').rank.toString()
                            .split('')
                            .slice(1)
                            .join('')
                            .replace(/#/,"1000000");
                        var num = parseInt( str );
                        return num;
                    };
                    this.collection.sort();
                    break;
                default:
                    this.collection.comparator = function(model){
                        return model.get('title');
                    };
            }

            $('#book-list').remove();
            this.showBooks();

        }



    });

    return Home;

});