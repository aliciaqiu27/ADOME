
$.ajax({
    url: "https://api.rescuegroups.org/v5/public/animals/search/available/",
    headers: { Authorization: "TGBdZnRM" },
}).then(function (response) {
    console.log(response);



    for (let i = 0; i < response.data.length; i++) {
        let animalObj = {
            name: response.data[i].attributes.name,
            descriptionText: response.data[i].attributes.descriptionText,
            //other animal data here
        };
        if (response.data[i].relationships.pictures.data[0]) {
            animalObj.id0 =
                response.data[i].relationships.pictures.data[0].id;
        }
        if (response.data[i].relationships.pictures.data[1]) {
            animalObj.id1 =
                response.data[i].relationships.pictures.data[1].id;
        }
        if (response.data[i].relationships.pictures.data[2]) {
            animalObj.id2 =
                response.data[i].relationships.pictures.data[2].id;
        }
        animals.push(animalObj);
        localStorage.setItem(animalObj, animalObj.descriptionText)
    }
    console.log(animals);

    for (let i = 0; i < response.included.length; i++) {
        if (response.included[i].type === "pictures") {
            // going through each of the animals to check the id, this way is inefficient but I'll leave it up to you to improve it
            for (let j = 0; j < animals.length; j++) {
                if (animals[j].id0 === response.included[i].id) {
                    animals[j].imgURL0 = response.included[i].attributes.original.url;
                }

                if (animals[j].id1 === response.included[i].id) {
                    animals[j].imgURL1 =
                        response.included[i].attributes.original.url;
                }

                if (animals[j].id2 === response.included[i].id) {
                    animals[j].imgURL2 =
                        response.included[i].attributes.original.url;
                }
            }
        }
    }


    // $(".start").on("click", function (event) {


    //     $("#homeContainer").addClass("hide");
    //     $("#bodyContainer").removeClass("hide");

    //     // Here, it prevents the submit button from trying to submit a form when clicked
    //     event.preventDefault();

    //     $("#petImages").empty();
    //     $(".descriptionTextDiv").empty();

    //     console.log(currentAnimal)

    //     if (currentAnimal === undefined) {
    //         currentAnimal = 0
    //         console.log(currentAnimal)
    //     }




    //     // for (let i = 0; i < animals.length; i++) {
    //     var picture0 = $("<img>")
    //     var picture1 = $("<img>")

    //     let animalsArray0 = animals[currentAnimal].imgURL0;
    //     let animalsArray1 = animals[currentAnimal].imgURL1;
    //     let image0 = $(picture0).attr("src", animalsArray0);
    //     let image1 = $(picture1).attr("src", animalsArray1);

    //     console.log(picture0);
    //     let pictureResized0 = image0.addClass("pictureFinalArray");
    //     let pictureResized1 = image1.addClass("pictureFinalArray");
    //     $("#petImages").append(pictureResized0, pictureResized1);


    //     let descriptionText = response.data[currentAnimal].attributes.descriptionText;
    //     $(".descriptionTextDiv").append(descriptionText);
    //     // console.log(pictureArray);
    //     // }
    // });
});

$("#home").on("click", function (event) {

    $("#bodyContainer").addClass("hide");
    $("#homeContainer").removeClass("hide");
});


$("#start").on("click", function (event) {
    buttonEventListener("start", animals)
});

$("#next").on("click", function (event) {
    buttonEventListener("next", animals)
});

$("#left").on("click", function (event) {
    buttonEventListener("left", animals)
});



let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
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
