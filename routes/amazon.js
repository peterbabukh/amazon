var request = require("request");
var cheerio = require("cheerio");
var _ = require('underscore');
var Book = require('../models/Book');
var Books = require('../models/Books').Books;

exports.get = function(req, res) {

    var url = "http://www.amazon.com/Best-Sellers-Books-Science-Fiction/zgbs/books/16272/ref=zg_bs_nav_b_2_25";
    var books = new Books();
    var flag = 0;
    var timer;

    // sends request to url and fetch requested page html
    request(url, function (error, response, body) {

        if (!error) {

            // parses the fetched page html to work with it with jQuery
            var $ = cheerio.load(body);

            // gets array of 'A' elements needed for further deeper scrape of Amazon
            var items = $('body').find(".zg_title a");
            // gets array of images needed
            var imgs = $('body').find(".zg_itemImageImmersion");
            // gets array of titles needed
            var titles = $('body').find(".zg_title>a");

            // iterate every 'A' element and go to their href to scrape nested data
            // and save it in an object
            _.each(items, function(hr, ind) {

                var link = $(hr).attr('href');

                // gets image to be used in our API
                var img = $(imgs[ind]).html() || 'Not available';

                // gets title to be used in our API
                var title = $(titles[ind]).text().trim() || 'Not available';


                // goes to the deep nested link to scrape data from every nested page and save it in an object
                request(link, function(er, r, b) {
                    if (er) console.log("mistake inside: " + er);

                    var obj = {};

                    // async parses single target pages
                    var $ = cheerio.load(b);

                    // scrapes SalesRank
                    var salesRank = $('#SalesRank')
                            .clone()
                            .children()
                            .remove()
                            .end()
                            .text()
                            .split('\n')
                            .join('')
                            .split('  ')
                            .join('')
                            .trim() || '##';

                    // saves the scraped data to an object
                    obj.salesRank = salesRank;
                    obj.title = title;
                    obj.img = img;

                    // scrapes ladder data from Amazon book product data and processes it
                    // to get it in the needed form
                    var sections = $('#SalesRank').find('.zg_hrsr_item');

                    _.each(sections, function(sec, i) {
                        var rank = $(sec).find('.zg_hrsr_rank').text().trim();
                        var ladder = $(sec).find('.zg_hrsr_ladder>a');

                        var arr = [];
                        _.each(ladder, function(s) {
                            arr.push( $(s).text().trim() );

                        });
                        var ladderStr = arr.join(' ->- ').toString().trim();

                        var tempObj = {};
                        tempObj.rank = rank;
                        tempObj.ladder = ladderStr;
                        var entryNumber = 'entry' + (i + 1);

                        obj[entryNumber] = tempObj;

                    });

                    // creates new db book entry passing the data from our object
                    var book = new Book(obj);
                    // and pushes this new db entry to a collection of books to be stored in db
                    books.books.push( book );

                    // this flag is needed to check that all these async requests finished
                    // before going to further steps
                    flag += 1;


                });

            });

            // waits for all async requests to finish before saving the collection
            // of books to db
            timer = function waitLoad() {
                if (flag == items.length) {
                    saveBooks();
                }

                setTimeout(waitLoad, 100);
            };

            function saveBooks() {
                books.save(function(err) {
                    if (err) return next(err);

                    // when the collection of books is saved, end.
                    res.end();

                });
            }

            timer();


        } else {
            console.log("Something went wrong: " + error);
        }

    });


};