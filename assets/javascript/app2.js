function loadPage(){
$("#top").empty();
var divJumbotron = $("<div class='jumbotron mx-auto'>");
var title = $("<h1>").text("United States National Park");
var divInput = $("<div class='input-group mb-3'>");
var Input = $("<input type='text' class='form-control' placeholder='CA,CO,VA' id='nanp-input'>");
//var divButton = $("<div class='input-group-append'>");
var divButton = $("<br>");
var Button = $("<button class='btn btn btn-success' type='button' id='find-nanp'>").text("Search for Parks");
divJumbotron.append(title);
divJumbotron.append(divInput);
divJumbotron.append(Input);
divJumbotron.append(divButton);
divJumbotron.append(Button);
$("#top").append(divJumbotron);
};
loadPage();

$("#find-nanp").on("click", function(event) {
  event.preventDefault();
  $("#card").empty();
  var np = $("#nanp-input").val();
  var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + np + "&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC&limit=50";
  console.log(np);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(npData) {
    var results = (npData.data)
    console.log(results);

    for(var i = 0;i<results.length;i++){
      var designation = (results[i].designation);
      if(designation==="National Park" || designation==="National and State Parks"){
      var d1 = $("<div class='card-header'>");
      var info = $("<p id='title'>").text(results[i].fullName);
      d1.append(info);
      $(".card").append(d1);
      var d2 = $("<div class='row card-body'>");
      var d3 = $("<div class='col-12'>");
      var infoTitle1 = $("<p id='text1'>").text("Park Description");
      var info1 = $("<p id='text2'>").text(results[i].description);
      var infoTitle2 = $("<p id='text1'>").text("Directions");
      var info2 = $("<p id='text2'>").text(results[i].directionsInfo);
      var infoTitle3 = $("<p id='text1'>").text("Park Weather");
      var info3 = $("<p id='text2'>").text(results[i].weatherInfo);
      d2.append(d3);
      d2.append(infoTitle1);
      d2.append(info1);
      d2.append(infoTitle2);
      d2.append(info2);
      d2.append(infoTitle3);
      d2.append(info3);
      $(".card").append(d2);

//Images query goes here.

      var d4 = $("<div class='col-12'>");
      var image1 = $("<img id='images'>").attr("src","assets/images/download.jpg");
      var image2 = $("<img id='images'>").attr("src","assets/images/download.jpg");
      var image3 = $("<img id='images'>").attr("src","assets/images/download.jpg");
      d2.append(d4);
      d2.append(image1);
      d2.append(image2);
      d2.append(image3);
      $("#row").append(d2);
    }//End of if
    }//End of loop
  });//End of function npData
});//End of onclick function
