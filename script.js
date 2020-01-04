//put time in the beginning
$("#time").text(moment().format('MMMM Do YYYY,HH:mm:ss'));

//set the time on the top and update every second
setInterval(function () {
    $("#time").text(moment().format('MMMM Do YYYY,HH:mm:ss'));
}, 1000);


$(document).ready(function () {


    //Coding the functionality of the search button
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        //recognizing the html element hierarchy
        var value = $(this).siblings("#password").val();

        usersearch(value);
    })


    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        var searchHistory = $("#password").val().trim();
        console.log(searchHistory)

    });



    //AJAX call for user search/keyword
    function usersearch(searchterm) {
        var queryURL = "https://api.unsplash.com/photos/?client_id=a7cef5f3754b325bf85592d548cd55aa935b533b908cd0f0d48a15dc06c3983d";

        queryURL = queryURL + "&query" + searchterm


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        }
        )


    };


});