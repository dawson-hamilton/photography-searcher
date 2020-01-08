$("#time").text(moment().format('MMMM Do YYYY,HH:mm:ss'));

setInterval(function () {
    $("#time").text(moment().format('MMMM Do YYYY,HH:mm:ss'));
}, 1000);

$(document).ready(function () {
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
    });
});

function buildApodUrl() {
    var queryUrl = "https://api.nasa.gov/planetary/apod?";
    var apodParams = { "api_key": "aAa4zky4JtLr7ASY61ZetQhJmbconfw4g2rZW9RR" };
    return queryUrl + $.param(apodParams);
}

var apodUrl = buildApodUrl();
$.ajax({
    url: apodUrl, method: "GET"
}).then(function (data) {
    var apodData = data;

    $(".title").text(apodData.title);
    $(".date").text(apodData.date);
    var imgEl = $("<img class'col s10'>").attr("src", apodData.url);
    $(".apod-img").append(imgEl);
    $(".explanation").text(apodData.explanation);
});


$("#nasaBtn").on("click", function () {
    function buildSearchUrl() {
        var searchQueryUrl = "https://api.nasa.gov/planetary/apod?";
        var searchApodParams = { "api_key": "aAa4zky4JtLr7ASY61ZetQhJmbconfw4g2rZW9RR" };
        searchApodParams.date = $("#date").val();
        return searchQueryUrl + $.param(searchApodParams);
    }
    var searchApodUrl = buildSearchUrl();

    $.ajax({
        url: searchApodUrl, method: "GET"
    }).then(function (data) {
        var searchData = data;

        $(".title").text(searchData.title);
        $(".date").text(searchData.date);
        var imgEl = $("<img class'col s10'>").attr("src", searchData.url);
        $(".apod-img").empty();
        $(".apod-img").append(imgEl);
        $(".explanation").text(searchData.explanation);
    });
});