$(document).ready(function() {

  var restaurantScore = 0;
  var campgroundScore = 0;
  var campgroundRating = '';
  var restaurantScoreArray = [];
  var parkNameArray = [];
  var parkCodeArray = [];
  var bougieLabelArray = [];
  var currentQuery = '';
  var stateAbbreviations = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  function calculateBougieScore() {
    bougieScoreRestaurant();
    bougieScoreToilets();
    bougieScoreRV();
    bougieScoreInternet();
    bougieScoreUser()
  };


  $("#nanp-input").keyup(function(event) {
    if (event.keyCode === 13) {
      $("#find-nanp").click();
    }
  });

  $("#find-nanp").on("click", function(event) {
    event.preventDefault();
    var state = $("#nanp-input").val();
    var input = state.toUpperCase();
    // verify the user input is valid
    var validInput = stateAbbreviations.includes(input)
    if (!validInput) {
      // modal to instruct user to enter valid state abbreviation
      $('#myModal').modal('show');
      $("#nanp-input").val('');

    } // close if; input validation
    else {
      if (input !== currentQuery) {
        currentQuery = input;
        // clear previous elements
        $(".card-group").remove();
        $("#parksHead").empty();
        $("#parks-table > tbody").empty();
        // display table header
        $("#parksHead").append("<tr><th>Park Name</th><th>Image</th><th>Bad or Bougie</th></tr>");
        // display progress indicator
        var loading = $('<div>', {
          id: 'loading',
          class: 'animated flash',
          text: 'Loading...'
        });
        $("#parksHead").append(loading);

        var parksQueryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC";


        var parksResults;


        // ajax call to NPS/parks API
        function parksAJAX() {
          return $.ajax({
            url: parksQueryURL,
            method: "GET",
            dataType: "json",
            success: function(parksData) {
              parksResults = (parksData.data);
            } // close function, success
          }); // close ajax call
        } //close function, parksAJAX

        $.when(parksAJAX()).done(function(parksData) {

          for (var i = 0; i < parksResults.length; i++) {
            // var userRating = -1;
            // var restaurantScore = 0;
            // var campgroundScore = 0;
            var bougieLabel = 'Calculating...';

            var designation = parksResults[i].designation;
            var nationalPark = designation.includes('National Park');
            if (designation === 'National and State Parks' || designation === 'National Park' || designation === 'National Park & Preserve') {

              var parkName = parksResults[i].name;
              var description = parksResults[i].description;
              var parkCode = parksResults[i].parkCode;
              var parkCodeSelector = '#' + parkCode;
              var stampLocation = 'assets/images/Click Pics/' + parkName + '.jpg';
              var stampImage = '<img class="stamp", src="' + stampLocation + '" alt="' + parkName + ' Image">';
              $('#loading').remove();
              var appendRow = $("#parks-table > tbody").append("<tr><td>" + parkName + "</td><td>" + stampImage + "</td><td class=bLabel id='" + parkCode + "'>" + bougieLabel + "</td></tr>");
              var bougieCampgrounds = [];

              parkNameArray.push(parkName);

              // Foursquare API call
              var parkll = (getNumbers(parksResults[i].latLong));
              var foursquareURL = "https://api.foursquare.com/v2/venues/search?limit=5&categoryId=4d4b7105d754a06374d81259&ll=" + parkll[0] + ",-" + parkll[1] + "&radius=16094&client_id=X3USWU4Z2XO3SG41Q3WKGHOKSLOJQMD2J3MC44CKGOG0TVMI&client_secret=RUFZMWJCR1NEAP2T1WJSGQXNM5Q3PMWCWCFYEYW4X12SQEPU&v=20171231";


              // NPS/campgrounds API call
              var campgroundsQueryURL = "https://developer.nps.gov/api/v1/campgrounds?parkCode=" + parkCode + "&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC";

              function campgroundsAJAX() {
                $('.bLabel').text('No Camping');
                return $.ajax({
                  url: campgroundsQueryURL,
                  method: "GET",
                  dataType: "json",
                  success: function(campgroundsData) {
                    campgroundsResults = (campgroundsData.data);
                  } // close function, success
                }); // close ajax call
              } //close function, parksAJAX

              $.when(campgroundsAJAX()).done(function(campgroundsData) {

                // check each campground for bougie amenities
                for (var j = 0; j < campgroundsResults.length; j++) {
                  var campCode = campgroundsResults[j].parkCode;
                  var flushToilets = 0;
                  var rvAllowed = 0;
                  var hasInternet = 0;
                  var toiletArray = campgroundsResults[j].amenities.toilets;
                  var toiletType = toiletArray[0];

                  // record parkCode of each campground
                  parkCodeArray.push(campCode);
                  // determine to which park ratings of these campgrounds should be assigned
                  function mode(array) {
                    return array.sort((a, b) =>
                      array.filter(v => v === a).length -
                      array.filter(v => v === b).length
                    ).pop();
                  }

                  var modeParkCode = mode(parkCodeArray);
                  // variable to store the modeParkCode as a JQuery selector
                  var campCodeSelector = '#' + modeParkCode;
                  // are flush toilets present
                  if (toiletType.includes('Flush')) {
                    flushToilets++
                  };

                  // are RVs allowed
                  var rvOK = campgroundsResults[j].accessibility.rvAllowed;
                  if (rvOK === 1) {
                    rvAllowed++
                  };

                  // is there internet access
                  var internet = campgroundsResults[j].amenities.internetConnectivity;
                  if (internet) {
                    hasInternet++
                  }

                  // determine bougie rating based on campground amenities and record result
                  var bougieAmenities = flushToilets + rvAllowed + hasInternet;
                  if (bougieAmenities >= 2) {
                    // campgroundRating ='Bougie';
                    bougieLabelArray.push('Bougie')
                  } //close if

                  // campgroundRating = '';


                  // on final iteration, update search results with overall ratings
                  if (j + 1 === campgroundsResults.length) {
                    if (bougieLabelArray.length >= 1) {
                      // campgroundRating ='Bougie';
                      $(campCodeSelector).text('Bougie')
                    } //close if
                    else {
                      // campgroundRating = 'Bad';
                      $(campCodeSelector).text('Bad')
                    } // close else
                    bougieLabelArray = [];
                  } // close if, last iteration of campgrounds

                  // if (userRating > .5) {
                  //   bougieScore += 4
                  // } //close if; userRating
                  // else if (userRating < .5 && userRating >= 0) {
                  //   bougieScore -= 4
                  // } //close else if; userRating

                  flushToilets = 0;
                  rvAllowed = 0;
                  hasInternet = 0;
                }; // close loop, check each campground


              }); // close function campground response
            } //End of if, designation
            else {
              $('#loading').text('No results found. Search for another state.')
            } // end of else, designation
          } //End of loop, parse parksData
        }); //End of function parksData
      } // close if, current query doesn't equal last query
    }; // close else, input validation
  }); //End of onclick function

}); //Close function, document.ready

function getNumbers(inputString) {
  var regex = /\d+\.\d+|\.\d+|\d+/g,
    results = [],
    n;
  while (n = regex.exec(inputString)) {
    results.push(parseFloat(n[0]));
  }
  return results;
}
