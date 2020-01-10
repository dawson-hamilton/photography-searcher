$(document).ready(function () {


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
            updatePage(response);
        }
        )

    };


    //append photo results to the DOM
    function updatePage(UnsplashData, APItype) {
        console.log(UnsplashData);
        $("#photocards").html("");

        var data = UnsplashData.results;
        if (APItype === "random") {
            data = UnsplashData;
        }

        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            var photo = item.urls.thumb;
            var description = item.description;
            var username = item.user.name;
            var link = item.links.html;

            var col = $("<div>").addClass("col s12 m7")
            var card = $("<div>").addClass("card")
            var body = $("<div>").addClass("card-body p-2")
            var img = $("<img>").attr("src", photo)

            var p1 = $("<p>").addClass("card-content").text(description)

            var a = $("<a>").attr("href", link).text(description)
            col.append(card.append(body.append(img, a)));

            $("#photocards").append(col);
        }

    }



    //to do the random photo button
    // call photos without search

    $("#randBtn").on("click", function (event) {
        event.preventDefault();
        //recognizing the html element hierarchy

        var number = $("#options").val();

        randosearch(30);
    })


    function randosearch(number) {
        var queryURL = "https://api.unsplash.com/photos?page=1&client_id=a7cef5f3754b325bf85592d548cd55aa935b533b908cd0f0d48a15dc06c3983d";

        queryURL = queryURL + "&per_page=" + number;

        queryURL = queryURL + "&order_by=popular";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            updatePage(response, "random");
        }
        )

    };


});

