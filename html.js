
        $("#save").on("click", function(event) {

        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();
        $("#petImages").empty();
        $(".descriptionTextDiv").empty();
        
        $.ajax({
            url: "https://api.rescuegroups.org/v5/public/animals/search/available/",
            headers: { Authorization: "TGBdZnRM" },
            }).then(function (response) {
                console.log(response);
         
            let animals = [];
                for (let i = 0; i < response.data.length; i++) {
                    let animalObj = {
                        name: response.data[i].attributes.name,
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


                for (let k = 0; k < animals.length; k++) {
                    let pictureFinal0 = $("<img>")
                    let pictureFinal1 = $("<img>")
                    let picture0 = pictureFinal0.attr("src", animals[k].imgURL0);
                    const picture1 = pictureFinal1.attr("src", animals[k].imgURL1);
                    console.log(picture0);
                    const pictureResized0 = picture0.addClass("pictureFinalArray");
                    const pictureResized1 = picture1.addClass("pictureFinalArray");
                    $("#petImages").append(pictureResized0,pictureResized1);
                // console.log(pictureArray);
                    }
            });
    });
    