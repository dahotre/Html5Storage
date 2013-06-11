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
        var next_page_number = parseInt(next_page_link.split('=')[1]) + 1;
        var base_url = next_page_link.split('=')[0] + '=';
        $(this).attr('href', base_url + next_page_number);
        $.getJSON(next_page_link, function(quotes) {
            var new_quotes = '';
            $.each(quotes, function(key, val) {
                new_quotes = new_quotes + "<tr class='quote'><td>" + val.author + "</td><td>" + val.quote + "</td></tr>";
            });

            $('#quotesTable').append(new_quotes);
        });
    });

});