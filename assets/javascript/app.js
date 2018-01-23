

$(document).ready(function(){

  var restaurantPrices = [];
  var rvAllowed = false;
  var internet = false;
  var userRating = -1;
  var bougieScore = 0;
  var bougieLabel = 'Bad';
  var database = firebase.database();
  var YouRateIt = 'Click here';

  var ShowParkAmenities = $("#ShowParkAmenities");
  var ShowFineDining = $("#ShowFineDining");
  var ShowRatinglist = $("#ShowRatinglist");

  //console.log(ShowParkAmenities)

  $("#ShowParkAmenities").on("click", showParkAminities);
  $("#ShowFineDining").on("click", showFineDining);
  $("#ShowRatinglist").on("click", showRatinglist);

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

  $("#add-train-btn3").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
     var parkName3 = $("#parkName3").val().trim();
     var BadorBougie = $("#BadorBougie").val().trim();

    // Creates local "temporary" object for holding employee data
    var parkdata3 = {
      namethree: parkName3,
      Rating: BadorBougie
    };

    // Uploads employee data to the database
    database.ref().push(parkdata3);

    // Logs everything to console
    console.log(parkName3.namethree);
    console.log(BadorBougie.Rating);

    // Alert
    //alert("New Train Time successfully added");

    // Clears all of the text-boxes
     $("#parkName3").val("");
     $("#BadorBougie").val("");
  });

  $("#add-train-btn2").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
     var parkName2 = $("#parkName2").val().trim();
     var FineDining = $("#FineDining").val().trim();

    // Creates local "temporary" object for holding employee data
    var parkdata2 = {
      nametwo: parkName2,
      DiningOptions: FineDining
    };

    // Uploads employee data to the database
    database.ref().push(parkdata2);

    // Logs everything to console
    console.log(parkName2.nametwo);
    console.log(FineDining.DiningOptions);

    // Clears all of the text-boxes
     $("#parkName2").val("");
     $("#FineDining").val("");
  });

  $("#add-train-btn1").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var parkName = $("#parkName").val().trim();
    var Amenities = $("#Amenities").val().trim();

    // Creates local "temporary" object for holding employee data
    var parkdata = {
      name: parkName,
      ParkAmenities: Amenities
    };

    // Uploads employee data to the database
    database.ref().push(parkdata);

    // Logs everything to console
    console.log(parkName.name);
    console.log(Amenities.ParkAmenities);

    // Alert
    //alert("New Train Time successfully added");

    // Clears all of the text-boxes
    $("#parkName").val("");
    $("#Amenities").val("");
  });
// add onclick even here....

function showParkAminities() {
  $("#full-Park-Amenities-list").toggleClass('show');
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //console.log(childSnapshot.val());

    // Store everything into a variable.
    var parkName = childSnapshot.val().name;
    var Amenities = childSnapshot.val().ParkAmenities;

    // full list of items to the well
    $("#full-Park-Amenities-list").append(
      "<div class='well'> </span><span class='parkName'> " + childSnapshot.val().name +
      " </span><span class='amenities'> " + childSnapshot.val().ParkAmenities +
       "</span></div>");

  });
}//end function

function showFineDining() {
  $("#full-Fine-Dining-list").toggleClass('show');
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //console.log(childSnapshot.val());

    // Store everything into a variable.
    var parkName2 = childSnapshot.val().nametwo;
    var FineDining = childSnapshot.val().DiningOptions;

       // full list of items to the well
       $("#full-Fine-Dining-list").append(
         "<div class='well'> </span><span class='parkName'> " + childSnapshot.val().nametwo +
         " </span><span class='amenities'> " + childSnapshot.val().DiningOptions +
          "</span></div>");
  });
}//end function showFineDining

function showRatinglist() {
  $("#full-user-rating").toggleClass('show');

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //console.log(childSnapshot.val());

    // Store everything into a variable.
    var parkName3 = childSnapshot.val().namethree;
    var BadorBougie = childSnapshot.val().Rating;


       // full list of items to the well
       $("#full-user-rating").append(
         "<div class='well'> </span><span class='parkName'> " + childSnapshot.val().namethree +
         " </span><span class='amenities'> " + childSnapshot.val().Rating +
          "</span></div>");
  });
}//end function ShowRatinglist


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
    var nationalPark = designation.includes('National Park');
    if(designation === 'National and State Parks' || designation === 'National Park' || designation === 'National Park & Preserve'){
    var parkName = parksResults[i].name;
    console.log('parkName', parkName);
    var description = parksResults[i].description;
    var parkCode = parksResults[i].parkCode;
    var stampLocation = 'assets/images/Click Pics/' + parkName + '.jpg';
    var stampImage = '<img class="stamp", src="' + stampLocation + '" alt="' + parkName + ' Image">';
    var parkll = (getNumbers(parksResults[i].latLong));

    var foursquareURL = "https://api.foursquare.com/v2/venues/search?limit=10&categoryId=4d4b7105d754a06374d81259&ll="+parkll[0]+",-"+parkll[1]+"&radius=16094&client_id=X3USWU4Z2XO3SG41Q3WKGHOKSLOJQMD2J3MC44CKGOG0TVMI&client_secret=RUFZMWJCR1NEAP2T1WJSGQXNM5Q3PMWCWCFYEYW4X12SQEPU&v=20171231";
    $.ajax({
      url: foursquareURL,
      method: "GET"
    }).done(function(foursquareData) {
        var foursquareResults = (foursquareData.response)
        console.log(foursquareResults);
      });//End of function npData

      for (var j = 0; j < campgroundsResults.length; j++) {
        if (campgroundsResults[j].parkCode === parksResults[i].parkCode) {
          setCampgroundVars();
          console.log('rvAllowed', rvAllowed);
          console.log('internet', internet);
        }; //close if, campground within park
      }; //close loop, get campground data
      console.log("bougieScore", bougieScore);

    $("#parks-table > tbody").append("<tr><td>" + parkName + "</td><td>" + stampImage + "</td> <td>" + bougieLabel + "</td> <td>" + YouRateIt + "</td></tr>");
    }//End of if, designation
    }//End of loop, display name, description
  });//End of function parksData, campgroundsData
});//End of onclick function

}); //Close function, document.ready

function getNumbers(inputString){
    var regex=/\d+\.\d+|\.\d+|\d+/g,
        results = [],
        n;
    while(n = regex.exec(inputString)) {
        results.push(parseFloat(n[0]));
    }
    return results;
}


      var config = {
      apiKey: "AIzaSyAKnRMMYp3mMBPRoch0R05HifFI8rCk2QU",
      authDomain: "groupproject1-549f6.firebaseapp.com",
      databaseURL: "https://groupproject1-549f6.firebaseio.com",
      projectId: "groupproject1-549f6",
      storageBucket: "",
      messagingSenderId: "966755267892"
    };
    firebase.initializeApp(config);

    var dataRef = firebase.database();
