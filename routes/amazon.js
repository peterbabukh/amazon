var request = require("request");
var cheerio = require("cheerio");
var url = "http://www.amazon.com/Best-Sellers-Books-Science-Fiction/zgbs/books/16272/ref=zg_bs_nav_b_2_25";
var _ = require('underscore');
//var Book = require('../models/Book');
//var Books = require('../Books');

exports.get = function(req, res) {

    //var Books = new Books();
    var flag = 0;
    var timer;
    var Books = [];

    request(url, function (error, response, body) {

        if (!error) {
            var $ = cheerio.load(body);

            var items = $('body').find(".zg_title a");

            _.each(items, function(hr) {
                var link = $(hr).attr('href');

                request(link, function(er, r, b) {
                    if (er) {console.log("ошибка inside: " + er);}

                    var $ = cheerio.load(b);
                    var title = $('#ebooksProductTitle').text().trim();
                    var text = $('#SalesRank').clone().children().remove().end().text().trim();
                    var obj = {};
                    var st = text.toString();
                    obj.salesRank = st.split('\n').join('').split('  ').join('').trim();
                    obj.title = title;

                    var sections = $('#SalesRank').find('.zg_hrsr_item');

                    _.each(sections, function(sec) {
                        var rank = $(sec).find('.zg_hrsr_rank').text().trim();
                        var lastSection = $(sec).find('.zg_hrsr_ladder>b>a').text().trim();
                        var ladder = $(sec).find('.zg_hrsr_ladder>a');

                        var arr = [];
                        _.each(ladder, function(s) {
                            arr.push( $(s).text().trim() );
                        });
                        var ladderStr = arr.join(' ->- ').toString();

                        obj[ ladderStr ] = rank;


                    });
                    
                    //var Book = new Book(obj);
                    //Books.push( Book );
                    Books.push( obj );
                    flag += 1;


                });

            });

            timer = function waitLoad() {
                if (flag == items.length) {
                    saveBooks();
                }

                setTimeout(waitLoad, 100);

            };

            function saveBooks() {/*
                Books.save(function(err) {
                    if (err) return next(err);
                    res.send( 'OK' );

                });*/
                res.send( JSON.stringify(Books) );
            }

            timer();


        } else {
            console.log("Произошла ошибка: " + error);
        }

    });


};