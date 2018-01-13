$("#find-nanp").on("click", function(event) {
  event.preventDefault();
  var np = $("#nanp-input").val();
  // var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + np + "&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC&limit=1";
  var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + np + "&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC";
  console.log(np);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(npData) {
    $("#parks-table > tbody").empty();
    var results = (npData.data)
    console.log(results);
    for(var i = 0;i<results.length;i++){
      var designation = (results[i].designation);
      if(designation==="National Park" || designation==="National and State Parks"){
      // var d = $("<div>");
      // var fullname = $("<p>").text("Full Name: " + results[i].fullName);
      // var name = $("<p>").text("Name: " + results[i].name);
      // var description = $("<p>").text("Description: " + results[i].description);
      var name = results[i].name;
      var description = results[i].description;
      var bougieIndex = Math.floor(Math.random() * 2) + 1;
      console.log('bougieIndex', bougieIndex);
      var bougie;

      if (bougieIndex === 1) {
        bougie = 'Bougie'
      }
      else {
        bougie = 'Bad'
      }
      // var directionsInfo = $("<p>").text("Directions: " + results[i].directionsInfo);
      // var weatherInfo = $("<p>").text("Weather Information: "+ results[i].weatherInfo);
      // d.append(fullname);
      // d.append(name);
      // d.append(description);
      // d.append(directionsInfo);
      // d.append(weatherInfo);
      // d.append("<hr>");
      // $("#nanp-view").append(d);
      console.log('name', name);
      console.log('description', description);
      $("#parks-table > tbody").append("<tr><td>" + name + "</td><td>" +
  bougie + "</td><td>" + description + "</td></tr>");
    }//End of if
    }//End of loop
  });//End of function npData
});//End of onclick function

// $("#find-nanp-photo").on("click", function(event) {
//   event.preventDefault();
//   var photo = $("#nanp-input-photo").val();
//   console.log(photo);
//   var queryURLphoto = "https://pixabay.com/api/?key=7657924-0bde27079c14e7a1dd1053bf8&q=" + photo + "&per_page=3";
//   console.log(queryURLphoto);
//   $.ajax({
//     url: queryURLphoto,
//     method: "GET"
//   }).done(function(photoData){
//     var photoResult = (photoData.hits);
//     console.log(photoResult);
//     for(var i = 0;i < photoResult.length;i++){
//       var d = $("<div>");
//       var image = $("<img>");
//       image.attr("src", photoResult[i].webformatURL)
//       d.append(image);
//       $("#nanp-view-photo").append(d);
//     }//End of loop
//   });//End of photoData function
// }); //End of onclick
