//put time in the beginning
$("#time").text(moment().format('MMMM Do YYYY,HH:mm:ss'));

//set the time on the top and update every second

//Rockie edits
setInterval(function () {
    $("#time").text(moment().format('MMMM Do YYYY,HH:mm:ss'));
}, 1000);

function buildApodUrl() {
    var queryUrl = "https://api.nasa.gov/planetary/apod?";
    var apodParams = { "api-key": "aAa4zky4JtLr7ASY61ZetQhJmbconfw4g2rZW9RR&" };
    return queryUrl + $.param(apodParams);
}

var apodUrl = buildApodUrl();
$.ajax({
    URL: apodUrl, method: "GET"
}).then(function (data) {
    var apodData = data;

    $(".title").text(apodData.title);
});