var settings = {
  "url": "https://api.rescuegroups.org/v5/public/animals/search/available/",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "TGBdZnRM"
  },
  "data": "{\n    \"data\": {\n        \"filters\": \n    \t[\n    \t\t{\n    \t\t\t\"fieldName\": \"animals.breedPrimaryId\",\n    \t\t\t\"operation\": \"equal\",\n    \t\t\t\"criteria\": \"90\"\n    \t\t},\n    \t\t{\n    \t\t\t\"fieldName\": \"animals.sizeGroup\",\n    \t\t\t\"operation\": \"equal\",\n    \t\t\t\"criteria\": [\"Small\",\"Medium\"]\n    \t\t}\n    \t],\n    \t\"filterProcessing\": \"1 and 2\",\n        \"filterRadius\":\n        \t{\n        \t\t\"miles\": 100,\n        \t\t\"lat\": 34.1031,\n        \t\t\"lon\": -118.416\n        \t}\n        \n    }\n}\n",
};

$.ajax(settings).done(function (response) {
console.log(response);
console.log(response.data[0].attributes.adoptionFeeString);


var picture = response.data[1].attributes.pictureThumbnailUrl;
console.log(picture);
$("#picture").attr("src", picture);
});
