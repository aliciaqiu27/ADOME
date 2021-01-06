
function buttonEventListener(condition, response) {
   
    // Here, it prevents the submit button from trying to submit a form when clicked
        // event.preventDefault();

    console.log(condition);
    

    $("#petImages").empty();
    $(".descriptionTextDiv").empty();

    console.log(currentAnimal)

    if (condition === "start") {
        currentAnimal = 0
        $("#homeContainer").addClass("hide");
        $("#bodyContainer").removeClass("hide");
    }
    else if (condition === "next") {
        currentAnimal++;
    }
    else if (condition === "left") {

        if (currentAnimal === 0) {
            return
        }
        else currentAnimal--
    }


    // for (let i = 0; i < animals.length; i++) {
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
    
    const uluru = { lat: petLat, lng: petLong};
  
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    
    const marker = new google.maps.Marker({
      position: uluru,
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

    $("#next").on("click", function (event) {
        var savedPets = ["placeholder"];
        var favPet = localStorage.key(0);
        var stringedFavPet = JSON.stringify(animals[currentAnimal-1]);
        savedPets.push(stringedFavPet);
        localStorage.setItem("favPet", stringedFavPet);
    });
}

