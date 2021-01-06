//Call to the Rescue Group Web API
$.ajax({
  url: "https://api.rescuegroups.org/v5/public/animals/search/available/",
  headers: { Authorization: "TGBdZnRM" },
}).then(function (response) {
  console.log(response);


  //There were two separate arrays that provided different information for the pet, so this would help it combine information from both arrays.
  for (let i = 0; i < response.data.length; i++) {

    
    //Stores relevant pet data in an object array which will be pushed into an array
    let animalObj = {
      name: response.data[i].attributes.name,
      descriptionText: response.data[i].attributes.descriptionText,
      //other animal data here
    };

    //If statements to make sure there is value. If yes, it grabs the ID to link the other array with the same ID.
    if (response.data[i].relationships.pictures.data[0]) {
      animalObj.id0 =
        response.data[i].relationships.pictures.data[0].id;
    }
    if (response.data[i].relationships.pictures.data[1]) {
      animalObj.id1 =
        response.data[i].relationships.pictures.data[1].id;
    }
    if (response.data[i].relationships.locations.data[0]) {
      animalObj.id3 =
        response.data[i].relationships.locations.data[0].id;
      console.log(animalObj.id3)
    }

    animals.push(animalObj);
  }

  //If statements to make sure "type" is "pictures" to grab pet image URLs.
  for (let i = 0; i < response.included.length; i++) {
    if (response.included[i].type === "pictures") {

      for (let j = 0; j < animals.length; j++) {
        if (animals[j].id0 === response.included[i].id) {
          animals[j].imgURL0 = response.included[i].attributes.original.url;
        }

        if (animals[j].id1 === response.included[i].id) {
          animals[j].imgURL1 =
            response.included[i].attributes.original.url;
        }

      }
    }

    //If statements to make sure "type" is "locations" to grab pet latitude and longitude.
    if (response.included[i].type === "locations") {
      // going through each of the animals to check the id, this way is inefficient but I'll leave it up to you to improve it
      for (let j = 0; j < animals.length; j++) {

        if (animals[j].id3 === response.included[i].id) {
          animals[j].lat =
            response.included[i].attributes.lat;
          console.log(animals[j].lat)
          animals[j].lon =
            response.included[i].attributes.lon;
        }
      }
    }
  }
  console.log(animals);
});


//on-click functions for buttons. 
$("#home").on("click", function (event) {

  $("#bodyContainer").addClass("hide");
  $("#savedContainer").addClass("hide");
  $("#homeContainer").removeClass("hide");
});

$("#saved").on("click", function (event) {

  $("#bodyContainer").addClass("hide");
  $("#homeContainer").addClass("hide");
  $("#savedContainer").removeClass("hide");
  prependPets();
});

$("#start").on("click", function (event) {
  $("#homeContainer").addClass("hide");
  $("#bodyContainer").removeClass("hide");
  buttonEventListener()
});

$("#next").on("click", function (event) {
  buttonEventListener();
});

$("#left").on("click", function (event) {
  buttonEventListener()
});

$("#loved").on("click", function (event) {
  savedPets();
});
