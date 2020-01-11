var apiCall = {};

$(document).ready(function () {

    //initialize favorites
    if (JSON.parse(localStorage.getItem('favorites')) === null) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }

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
        var queryURL = "https://api.unsplash.com/search/photos/?page=1&client_id=fea432ec0480ac54a9584903b85fa3349b09daa857adf8a6b797cc5821889596";

        queryURL = queryURL + "&query=" + searchterm;

        queryURL = queryURL + "&per_page=" + number;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            apiCall = response.results;
            updatePage(response.results);
        });
    };

    //append photo results to the DOM
    function updatePage(UnsplashData, APItype) {
        console.log(UnsplashData);
        $("#photocards").html("");

        //handle data for fave button & random button
        data = UnsplashData;

        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            var photo = item.urls.regular;
            var username = item.user.name;
            var link = item.links.html;

            var col = $("<div>").addClass("col s12 m9 l4 xl4");
            var card = $("<div>").addClass("card");
            var body = $("<div>").addClass("card-image");

            var cardTitle = $("<span>").addClass("card-title");
            $(cardTitle).text(username);
            var alink = $("<a>");
            var heart = $("<div>").addClass("heart");
            heart.text("🤍");
            //the key to the kingdom - "Riley"
            heart.attr("data-index", i);
            $(alink).attr("href", link);
            $(alink).attr("target", "blank");
            var img = $("<img>").attr("src", photo);

            if (APItype === "faves") {
                heart.text("❤️");
            }

            alink.append(img);
            body.append(heart);
            body.append(alink);
            body.append(cardTitle);
            card.append(body);
            col.append(card);

            $("#photocards").append(col);
        }

        //error note if search term does not return results
        if (UnsplashData.length === 0) {
            var error = $("#error").addClass("card-panel");
            $("#error").text("No results. Please search another keyword.");
        } else {
            $("#error").empty();
        }

        //attach event listener to hearts
        $(".heart").on("click", function (event) {
            $(this).text("❤️");
            $(this).append();
            var temp = JSON.parse(localStorage.getItem('favorites'));

            temp.push(apiCall[$(this).data("index")]);

            //save it
            localStorage.setItem('favorites', JSON.stringify(temp));
        });
    }

    // faves button
    $("#favesBtn").on("click", function (event) {
        event.preventDefault();
        //read whats there
        var temp2 = JSON.parse(localStorage.getItem('favorites'));

        updatePage(temp2, "faves");
    });

    $("#randBtn").on("click", function (event) {
        event.preventDefault();

        randosearch();
    });

    function randosearch() {
        var queryURL = "https://api.unsplash.com/photos/random?page=1&client_id=fea432ec0480ac54a9584903b85fa3349b09daa857adf8a6b797cc5821889596";

        queryURL = queryURL + "&count=30";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            apiCall = response;
            updatePage(response, "random");
        });
    };
});