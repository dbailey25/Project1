$(document).ready(function(){

  var restaurantPrices = [];
  var rvAllowed = false;
  var internet = false;
  var userRating = -1;
  var bougieScore = 0;
  var bougieLabel = 'Bad';

  function calculateBougieScore() {
  bougieScoreRestaurant();
  bougieScorePrice();
  bougieScoreRV();
  bougieScoreInternet();
  bougieScoreUser()
  };
  function bougieScoreRestaurant() {
  if (restaurantPrices.length > 0) {
    bougieScore++
  }; //close if; nearbyRestaurants
  } //close function; bougieScoreRestaurant
  function bougieScorePrice() {
  var price2 = restaurantPrices.indexOf(2);
  var price3 = restaurantPrices.indexOf(3);
  var price4 = restaurantPrices.indexOf(4);
  if (price4 > -1) {
      bougieScore += 3
  } //close if; price4
  else if (price3 > -1) {
      bougieScore += 2
  } //close if; price3
  else if (price2 > -1) {
      bougieScore++
  } //close if; price2
  } //close function; bougieScorePrice
  function bougieScoreRV() {
  if (rvAllowed) {
    bougieScore++
  } //close if; rvAllowed
  }//close function; bougieScoreRV
  function bougieScoreInternet() {
  if (internet) {
    bougieScore++
  } //close if; internet
  }//close function; bougieScoreInternet
  function bougieScoreUser() {
  if (userRating > .5) {
    bougieScore += 4
  } //close if; userRating
  else if (userRating < .5 && userRating >= 0) {
    bougieScore -= 4
  } //close else if; userRating
  }//close function; bougieScoreUser

  function setBougieLabel() {
    if (bougieScore >= 3) {
      bougieLabel = 'Bougie'
    }
  }

$("#find-nanp").on("click", function(event) {
  event.preventDefault();
  var state = $("#nanp-input").val();
  console.log(state);
  // var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + np + "&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC&limit=1";
  var parksQueryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC";
  var campgroundsQueryURL = "https://developer.nps.gov/api/v1/campgrounds?stateCode=" + state + "&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC";
  var parksResults;
  var campgroundsResults;

  // ajax calls to NPS API
  function parksAJAX() {
    return $.ajax({
    url: parksQueryURL,
    method: "GET",
    dataType:"json",
    success: function(parksData) {
      parksResults = (parksData.data);
    }
  });
} //close function, parksAJAX

  function campgroundsAJAX() {
    return $.ajax({
    url: campgroundsQueryURL,
    method: "GET",
    dataType:"json",
    success: function(campgroundsData) {
      campgroundsResults = (campgroundsData.data);
    }
  });
} //close function, campgroundsAJAX

  $.when(parksAJAX(), campgroundsAJAX()).done(function(parksData, campgroundsData) {
  $("#parks-table > tbody").empty();
  console.log(parksResults);
  console.log(campgroundsResults);

  function setCampgroundVars() {
    rvAllowed = campgroundsResults[j].accessibility.rvAllowed;
    internet = campgroundsResults[j].amenities.internetConnectivity;
  }

  for(var i = 0;i<parksResults.length;i++){
    var designation = parksResults[i].designation;
    if(designation==="National Park" || designation==="National and State Parks"){
    var parkName = parksResults[i].name;
    console.log('parkName', parkName);
    var description = parksResults[i].description;
    var parkCode = parksResults[i].parkCode;
    var stampLocation = 'assets/images/stamps/' + parkCode + '.png';
    var stampImage = '<img class="stamp", src="' + stampLocation + '" alt="' + parkName + ' Image">';

      for (var j = 0; j < campgroundsResults.length; j++) {
        if (campgroundsResults[j].parkCode === parksResults[i].parkCode) {
          setCampgroundVars();
          console.log('rvAllowed', rvAllowed);
          console.log('internet', internet);
        }; //close if, campground within park
      }; //close loop, parkCodeIndex

    $("#parks-table > tbody").append("<tr><td>" + parkName + "</td><td>" + stampImage + "</td><td>" + bougieLabel + "</td></tr>");
    }//End of if, designation
    }//End of loop, display name, description
  });//End of function parksData, campgroundsData
});//End of onclick function

}); //Close function, document.ready
