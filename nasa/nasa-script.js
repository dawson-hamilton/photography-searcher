var apodData, searchData;

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
    apodData = data;

    $(".title").text(apodData.title);
    $(".date").text(apodData.date);
    $("#nasaImg").attr("src", apodData.url);
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
        searchData = data;

        $(".title").text(searchData.title);
        $(".date").text(searchData.date);
        $("#nasaImg").empty();
        $("#nasaImg").attr("src", searchData.url);
        $(".explanation").text(searchData.explanation);
    });
});