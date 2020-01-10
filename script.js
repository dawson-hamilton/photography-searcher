var apiCall = {};

$(document).ready(function () {

    //initialize favorites
    localStorage.setItem('favorites', JSON.stringify([]));


    //Coding the functionality of the search button
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        //recognizing the html element hierarchy
        var value = $("#searchterm").val();

        var number = $("#options").val();

        usersearch(value, number);
    })




    //AJAX call for user search/keyword
    function usersearch(searchterm, number) {
        var queryURL = "https://api.unsplash.com/search/photos/?page=1&client_id=a7cef5f3754b325bf85592d548cd55aa935b533b908cd0f0d48a15dc06c3983d";

        queryURL = queryURL + "&query=" + searchterm;

        queryURL = queryURL + "&per_page=" + number;


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            apiCall = response.results;
            updatePage(response.results);
        }
        )

    };


    //append photo results to the DOM
    function updatePage(UnsplashData, APItype) {
        console.log(UnsplashData);
        $("#photocards").html("");

        // var data = UnsplashData.results;

        //handle data for fave button & random button
        // if (APItype === "random" || APItype === "faves") {
        data = UnsplashData;
        // }




        //append cards dynamically
        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            var photo = item.urls.regular;
            var username = item.user.name;
            var link = item.links.html;


            var col = $("<div>").addClass("col s12 m9 l4 xl4")
            var card = $("<div>").addClass("card")
            var body = $("<div>").addClass("card-image")

            var cardTitle = $("<span>").addClass("card-title");
            $(cardTitle).text(username);
            var alink = $("<a>")
            var heart = $("<div>").addClass("heart");
            heart.text("❤️");
            //the key to the kingdom - "Riley"
            heart.attr("data-index", i);
            $(alink).attr("href", link);
            $(alink).attr("target", "blank");
            var img = $("<img>").attr("src", photo)




            alink.append(img);
            body.append(heart);
            body.append(alink);
            body.append(cardTitle);
            card.append(body);
            col.append(card);

            $("#photocards").append(col);


        }

        //error note if search term does not return results
        if (UnsplashData.results.length === 0) {
            console.log("here");
            var error = $("#error").addClass("card-panel");
            $("#error").text("No results. Please search another keyword.");

        } else {
            $("#error").empty();
            console.log("here too!");
        };



        //attach event listener to hearts
        $(".heart").on("click", function (event) {

            //add a favorite

            //read whats there
            var temp = JSON.parse(localStorage.getItem('favorites'));



            //add to the local storage
            //get the object from global variable
            //key to the kingdom
            temp.push(apiCall[$(this).data("index")]);

            //save it
            localStorage.setItem('favorites', JSON.stringify(temp));




        })

    }

    // faves button
    $("#favesBtn").on("click", function (event) {
        event.preventDefault();
        //read whats there
        var temp2 = JSON.parse(localStorage.getItem('favorites'));


        updatePage(temp2, "faves");
    })





    //to do the random photo button
    // call photos without search

    $("#randBtn").on("click", function (event) {
        event.preventDefault();

        randosearch();
    })


    function randosearch() {
        var queryURL = "https://api.unsplash.com/photos/random?page=1&client_id=a7cef5f3754b325bf85592d548cd55aa935b533b908cd0f0d48a15dc06c3983d";


        queryURL = queryURL + "&count=30";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            apiCall = response;
            updatePage(response, "random");
        }
        )

    };



});

