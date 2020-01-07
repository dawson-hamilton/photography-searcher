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

    //random button function
    $("#randBtn").on("click", function (event) {
        event.preventDefault();


        //alphabet letters to search
        var letters = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 30; ++i) {
            //random number between 0 and 26
            var rand = Math.floor((Math.random() * 26));
            var searchMe = letters.charAt(rand);
        }


        fetchphotos(searchMe);
    })



    //AJAX call for user search/keyword
    function usersearch(searchterm) {
        var queryURL = "https://api.unsplash.com/photos/?client_id=a7cef5f3754b325bf85592d548cd55aa935b533b908cd0f0d48a15dc06c3983d";

        queryURL = queryURL + "&query=" + searchterm



        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        }
        )

    };

    //function to return results based on keyword
    function fetchphotos(searchterm) {
        var indivsearchURL = buildQueryURL(searchterm);

        $.ajax({
            url: indivsearchURL,
            method: "GET"
        }).then(updatePage);

    };

    //build customized API request based on searchterm
    function buildQueryURL(searchterm) {
        // var searchterm = $("#searchterm").val().trim();
        console.log(searchterm);


        var APIkey = "a7cef5f3754b325bf85592d548cd55aa935b533b908cd0f0d48a15dc06c3983d";
        var Upsplash = "https://api.unsplash.com/photos/?"
        var URL = Upsplash + "&query=" + searchterm + "&client_id=" + APIkey;
        console.log(URL);

        return URL;

    };


    //append photo results to the DOM
    function updatePage(UpsplashData) {
        console.log(UpsplashData);
        $("#photocards").html("");

        for (var i = 0; i < UpsplashData.list.length; i++) {


            var photo = item.links.html;
            var description = item.alt_description;
            var username = item.user.name;
            var link = item.urls.full;

            var col = $("<div>").addClass("col s12 m7")
            var card = $("<div>").addClass("card")
            // var body = $("<div>").addClass("card-body p-2")
            // var img = $("<img>").attr("src", "http://" + ".png")

            var p1 = $("<p>").addClass("card-content").text(description)

            col.append(card.append(body.append(img, p1)));

            $("#photocards").append(col);
        }

    }




});