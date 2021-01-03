// // google maps api 
// let map, infoWindow;
// var apiKey = ""

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();
//   const locationButton = document.createElement("button");
//   locationButton.textContent = "Pan to Current Location";
//   locationButton.classList.add("custom-map-control-button");
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//   locationButton.addEventListener("click", () => {
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           infoWindow.setPosition(pos);
//           infoWindow.setContent("Location found.");
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter());
//         }
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
//   });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }


// //zipcode application
//     var clientKey = "js-9qZHzu2Flc59Eq5rx10JdKERovBlJp3TQ3ApyC4TOa3tA8U7aVRnFwf41RpLgtE7";
		
// 		var cache = {};
// 		var container = $("#example1");
// 		var errorDiv = container.find("div.text-error");
		
// 		/** Handle successful response */
// 		function handleResp(data)
// 		{
// 			// Check for error
// 			if (data.error_msg)
// 				errorDiv.text(data.error_msg);
// 			else if ("city" in data)
// 			{
// 				// Set city and state
// 				container.find("input[name='city']").val(data.city);
// 				container.find("input[name='state']").val(data.state);
// 			}
// 		}
		
// 		// Set up event handlers
// 		container.find("input[name='zipcode']").on("keyup change", function() {
// 			// Get zip code
// 			var zipcode = $(this).val().substring(0, 5);
// 			if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode))
// 			{
// 				// Clear error
// 				errorDiv.empty();
				
// 				// Check cache
// 				if (zipcode in cache)
// 				{
// 					handleResp(cache[zipcode]);
// 				}
// 				else
// 				{
// 					// Build url
// 					var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";
					
// 					// Make AJAX request
// 					$.ajax({
// 						"url": url,
// 						"dataType": "json"
// 					}).done(function(data) {
// 						handleResp(data);
						
// 						// Store in cache
// 						cache[zipcode] = data;
// 					}).fail(function(data) {
// 						if (data.responseText && (json = $.parseJSON(data.responseText)))
// 						{
// 							// Store in cache
// 							cache[zipcode] = json;
							
// 							// Check for error
// 							if (json.error_msg)
// 								errorDiv.text(json.error_msg);
// 						}
// 						else
// 							errorDiv.text('Request failed.');
// 					});
// 				}
// 			}
// 		}).trigger("change");
//pet api
var settings = {
  "url": "https://api.rescuegroups.org/v5/public/animals/search/available/",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "TGBdZnRM"
  },
  "data": "{\n    \"data\": {\n        \"filters\": \n    \t[\n    \t\t{\n    \t\t\t\"fieldName\": \"animals.id\",\n    \t\t\t\"operation\": \"equal\",\n    \t\t\t\"criteria\": \"10006340\"\n    \t\t},\n    \t\t{\n    \t\t\t\"fieldName\": \"animals.sizeGroup\",\n    \t\t\t\"operation\": \"equal\",\n    \t\t\t\"criteria\": [\"Small\",\"Medium\"]\n    \t\t}\n    \t],\n    \t\"filterProcessing\": \"1 and 2\",\n        \"filterRadius\":\n        \t{\n        \t\t\"miles\": 100,\n        \t\t\"lat\": 34.1031,\n        \t\t\"lon\": -118.416\n        \t}\n        \n    }\n}\n",
};

$.ajax(settings).done(function (response) {
console.log(response);
console.log(response.data[0].attributes.adoptionFeeString);


var descriptionText = response.data[0].attributes.descriptionText;
console.log(descriptionText);
$(".descriptionTextDiv").append(descriptionText)

for (let i = 0; i < response.included.length; i++) {
  const picture = response.included[i].type;
  console.log(picture);
  
  if (picture==="pictures") {

    const pictureArray = response.included[i].attributes.large.url;
    const pictureFinal = $("<img>").attr("src", pictureArray);
    const pictureResized = pictureFinal.addClass("pictureFinalArray");

    console.log(pictureArray);

    $("#petImages").append(pictureResized)
  }
}

});