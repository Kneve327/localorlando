// Yelp URL
// GET https://api.yelp.com/v3/businesses/search
// Client ID: Hh8RLH6Ycy-XkbewRt6LqQ
// Key: B8FOKrLpb_-yezrVAPe2XPClogB8Lj3flBv3LVYYOo6t4B7tSBMkzwxPqfE7yIja2dW6S1Ot5HXdQ3yvRBZte7k-JHPVhjlow3f4z10N2PiDsEvEiQgvKTZgcay2W3Yx
// ?term=restaurants&location=orlando

var token = "Bearer B8FOKrLpb_-yezrVAPe2XPClogB8Lj3flBv3LVYYOo6t4B7tSBMkzwxPqfE7yIja2dW6S1Ot5HXdQ3yvRBZte7k-JHPVhjlow3f4z10N2PiDsEvEiQgvKTZgcay2W3Yx"
var yelpSearchURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search"

// Search Function
$("#search-btn").on("click", function(){
    event.preventDefault()
    var userInput = $("#search-txt").val().trim()
    var requestOBJ = {
        url: yelpSearchURL,
        data: {term: userInput, location: "orlando"},
        headers: {"Authorization": token}
    }
    
    $.ajax(requestOBJ)
        .done(function(response) {
            console.log("User Input = " + userInput);
            console.log("response = ", response);
            
           
            for (var i = 0; i <= 9; i ++){
            var container = $("#container")
            // Assigns number to each individual divid
            var divid = i;
            container.append("<div id='answerdiv-"+divid+"'>  </div>")
            $("#answerdiv-" +divid).append($("<img />").attr("id", "imagetag" + divid))
            // Creates and displays images
            $("#imagetag" +divid).attr("src", response.businesses[i].image_url).css("width", "400px").css("height","300px").css("text-align","center")
            // Creates and displays business names
            $("#answerdiv-"+divid).append("<p id='namediv" + divid + "'>" + response.businesses[i].name + "</p>").css("text-align","center")
            // Creates and displays business locations
            $("#answerdiv-"+divid).append("<p id='locationdiv" + divid + "'>" + response.businesses[i].location.address1 + "</p>").css("text-align","center")
            // Creates and displays business phone numbers
            $("#answerdiv-"+divid).append("<p id='phonediv" + divid + "'>" + response.businesses[i].phone + "</p>").css("text-align","center")
            }   
        })               
})

// ------------------------------------------------------------------------------------------------------------------------------------------------
// Weather API

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=orlando&units=imperial&APPID=8ec6360d565ef411810326e9da63398d",
    method: "GET"
}).then(function(response) {
    console.log("---------------------Weather----------------------------")
    console.log(response)
    $("#weatherdisplay").text("Current Temp: " + response.main.temp + "\xB0" + "," + " Current Humidity: " + response.main.humidity + "%" + "," + " Current Weather: " + response.weather[0].description).css("text-align","center").css("font-weight","bold")
})