// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require handlebars
//= require_tree .

$(function() {

    $('footer a').click(function (event) {
        event.preventDefault();
        console.log('clicked');
        var next_page_link = $(this).attr('href');
        console.log('href: ' + next_page_link);
        var next_page_number = next_page_link.split('=')[1];
        var base_url = next_page_link.split('=')[0] + '=';
        var new_next_page_number = parseInt(next_page_number) + 1;
        var new_next_page_url = base_url + new_next_page_number;
        $(this).attr('href', new_next_page_url);


        if (localStorage.length >= 1) { //If anything is stored in localStorage
            var page_number_iterator = 1;
            var quotes_array = [];
            while (page_number_iterator <= next_page_number) {
                if (page_number_iterator == next_page_number) {
                    var quotes_in_csv = localStorage.getItem(page_number_iterator.toString());
                    $.each(quotes_in_csv.split('||'), function(key, val) {
                       if (key > 0) { //Hackish to get rid of initial ||
                           quote = new Object();
                           quote.author = val.split('~')[0];
                           quote.quote = val.split('~')[1];
                           quotes_array.push( quote );
                       }
                    });
                }
                page_number_iterator += 1;
            }
            show(quotes_array);
        }
        else {     //Else do the normal thing
            $.getJSON(next_page_link, show);
        }

        //store next in localStorage
        $.getJSON( new_next_page_url, function(quotes) {
            var csv_quotes = '';
            $.each(quotes, function(key, val) {
                csv_quotes += '||' + val.author + '~' + val.quote;
            });

            localStorage.setItem(new_next_page_number.toString(), csv_quotes);
        });


    });

    //Shows quotes supplied as an Array of Quote objects
    var show = function(quotes) {
        var new_quotes = '';
        $.each(quotes, function(key, val) {
            new_quotes = new_quotes + "<tr class='quote'><td>" + val.author + "</td><td>" + val.quote + "</td></tr>";
        });

        $('#quotesTable').append(new_quotes);
    };

});