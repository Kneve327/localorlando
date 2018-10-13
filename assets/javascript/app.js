// Yelp URL
// GET https://api.yelp.com/v3/businesses/search
// Client ID: Hh8RLH6Ycy-XkbewRt6LqQ
// Key: B8FOKrLpb_-yezrVAPe2XPClogB8Lj3flBv3LVYYOo6t4B7tSBMkzwxPqfE7yIja2dW6S1Ot5HXdQ3yvRBZte7k-JHPVhjlow3f4z10N2PiDsEvEiQgvKTZgcay2W3Yx
// ?term=restaurants&location=orlando

var token = "Bearer B8FOKrLpb_-yezrVAPe2XPClogB8Lj3flBv3LVYYOo6t4B7tSBMkzwxPqfE7yIja2dW6S1Ot5HXdQ3yvRBZte7k-JHPVhjlow3f4z10N2PiDsEvEiQgvKTZgcay2W3Yx"
var yelpSearchURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search"

var selectionObject;

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDDbWbPqd-sa7KIMz2Lc2IEIVg_yaOGMAU",
    authDomain: "project-1-local-orlando.firebaseapp.com",
    databaseURL: "https://project-1-local-orlando.firebaseio.com",
    projectId: "project-1-local-orlando",
    storageBucket: "project-1-local-orlando.appspot.com",
    messagingSenderId: "189441778490"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// Clear Results
$("#clear-results").on("click", function() {
    $("#container").empty()
 })

// Search Function
$("#search-btn").on("click", function(){
    event.preventDefault()
    $("#container").empty()
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
            container.append("<div id='answerdiv-"+divid+"'>  </div>")//.addClass("shadow p-3 mb-5 rounded")
            $("#answerdiv-" +divid).append($("<img />").attr("id", "imagetag" + divid))
            // Creates and displays images
            $("#imagetag" +divid).attr("src", response.businesses[i].image_url).css("width", "100%").css("height","100%").css("text-align","center")
            // Creates and displays business names
            $("#answerdiv-"+divid).append("<p id='namediv" + divid + "'>" + response.businesses[i].name + "</p>")
            // Creates and displays business locations
            $("#answerdiv-"+divid).append("<p id='locationdiv" + divid + "'>" + response.businesses[i].location.address1 + "</p>").css("text-align","center")
            // Creates and displays business phone numbers
            $("#answerdiv-"+divid).append("<p id='phonediv" + divid + "'>" + response.businesses[i].phone + "</p>").css("text-align","center")
            // Creates and displays a button and assigns data attributes
            $("#answerdiv-"+divid).append($("<button>").text("Add").addClass("results-button btn btn-primary").attr("data-name", response.businesses[i].name).attr("data-location", response.businesses[i].location.address1).attr("data-phone", response.businesses[i].phone))
            }
            
            $(".results-button").on("click", function(event) {
                event.preventDefault();

                $("#add-modal").modal()
                var selectionName = $(this)[0].dataset.name
                var selectionLocation = $(this)[0].dataset.location
                var selectionPhone = $(this)[0].dataset.phone
                
                console.log(selectionName)
                console.log(selectionLocation)
                console.log(selectionPhone)

                $("#name-input").val(selectionName)
                $("#address-input").val(selectionLocation)
                $("#phone-input").val(selectionPhone)    

                var selection = {
                    name: selectionName,
                    address: selectionLocation,
                    phone: selectionPhone,
                }

                selectionObject = selection;
            })
        })
})

$("#modal-add-button").on("click", function(event) {
    event.preventDefault();
    
    var selectionTime = $("#selected-time").val();
    
    selectionObject.time = selectionTime;
    
    database.ref().push(selectionObject);

    console.log(selectionObject.name);
    console.log(selectionObject.address);
    console.log(selectionObject.phone);
    console.log(selectionObject.time);
})

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var newName = childSnapshot.val().name
    var newLocation = childSnapshot.val().address
    var newPhone = childSnapshot.val().phone
    var newTime = childSnapshot.val().time

    console.log(newName)
    console.log(newLocation)
    console.log(newPhone)
    console.log(newTime)
    
    // Create a new row
    var newRow = $("<span>").text(newTime + newName + newLocation + newPhone);
    
    // Append the new row to the table
    $("#itinerary").append(newRow);
    
    //<button class="dropdown-item" type="button">Action</button>
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