//buttonEventHandler for repeating code associated with "start", "next", and "left" buttons 
function buttonEventListener() {
  console.log();

  //Empties div when buttons are clicked 
  $("#petImages").empty();
  $(".descriptionTextDiv").empty();

  //Random number is generated
  currentAnimal = Math.floor((Math.random() * animals.length) + 0);

  
  var picture0 = $("<img>")
  var picture1 = $("<img>")

  let animalsArray0 = animals[currentAnimal].imgURL0;
  let animalsArray1 = animals[currentAnimal].imgURL1;
  let image0 = $(picture0).attr("src", animalsArray0);
  let image1 = $(picture1).attr("src", animalsArray1);

  console.log(picture0);
  let pictureResized0 = image0.addClass("pictureFinalArray");
  let pictureResized1 = image1.addClass("pictureFinalArray");
  $("#petImages").append(pictureResized0, pictureResized1);


  let petNameText = animals[currentAnimal].name;
  $("#petName").text(petNameText);

  let descriptionText = animals[currentAnimal].descriptionText;
  $("#petInfo").text(descriptionText);

  let petLat = animals[currentAnimal].lat;
  $("#lat").text(petLat);

  let petLong = animals[currentAnimal].lon;
  $("#lon").text(petLong);

  let map, infoWindow;

  var presetLat = 33.448376;
  var presetLong = -112.074036;

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: presetLat, lng: presetLong },
      zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {

        handleLocationError(false, infoWindow, map.getCenter());
      }

      const petLocation = { lat: petLat, lng: petLong };

      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: petLocation,
      });

      const marker = new google.maps.Marker({
        position: petLocation,
        map: map,
      });

    });
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);

  }
  initMap();
}

let savedPetsArray = JSON.parse(localStorage.getItem("favPet")) || []
console.log(savedPetsArray);
function savedPets() {
  // var stringedFavPet = JSON.stringify(animals[currentAnimal].descriptionText);
  // console.log(stringedFavPet)
  savedPetsArray.push(animals[currentAnimal].imgURL0, animals[currentAnimal].imgURL1);
  localStorage.setItem("favPet", JSON.stringify(savedPetsArray));
}

function prependPets() {

  $("#savedContainer").empty();

  for (let i = 0; i < savedPetsArray.length; i++) {
    savedPetsDiv = $("<img>")
    $(savedPetsDiv).addClass("savedPetsDivCSS")
    savedPetsDiv.attr("src", savedPetsArray[i])
    $("#savedContainer").prepend(savedPetsDiv);
  }
  let matchesTitle = $("<p>").html("<h2>" + "Matches" + "</h2>");
  $("#savedContainer").prepend(matchesTitle);
};

