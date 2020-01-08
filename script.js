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

            var photo = item.urls.regular;
            var username = item.user.name;
            var link = item.links.html;


            var col = $("<div>").addClass("col s12 m9 l4 xl4")
            var card = $("<div>").addClass("card")
            var body = $("<div>").addClass("card-image")
            var cardTitle = $("<span>").addClass("card-title");
            $(cardTitle).text(username);
            var alink = $("<a>")
            $(alink).attr("href", link);
            $(alink).attr("target", "blank");
            var img = $("<img>").attr("src", photo)




            alink.append(img);
            body.append(alink);
            body.append(cardTitle);
            card.append(body);
            col.append(card);

            $("#photocards").append(col);
        }

    }



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
            updatePage(response, "random");
        }
        )

    };


});

