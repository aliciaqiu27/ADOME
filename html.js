
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
        animals.join("")


        $(".start").on("click", function(event) {

        
        $("#homeContainer").addClass("hide");
        $("#bodyContainer").removeClass("hide");

        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();
        
        $("#petImages").empty();
        $(".descriptionTextDiv").empty();
        
        
        for (let i = 0; i < animals.length; i++) {
            var picture0 = $("<img>")
            var picture1 = $("<img>")
            
                        let animalsArray0 = animals[i].imgURL0;
                        let animalsArray1 = animals[i].imgURL1;
                        let image0 = $(picture0).attr("src", animalsArray0);
                        let image1 = $(picture1).attr("src", animalsArray1);
                        
                        console.log(picture0);
                        let pictureResized0 = image0.addClass("pictureFinalArray");
                        let pictureResized1 = image1.addClass("pictureFinalArray");
                        $("#petImages").append(pictureResized0, pictureResized1);


                        let descriptionText = response.data[i].attributes.descriptionText;
                        $(".descriptionTextDiv").append(descriptionText);
                // console.log(pictureArray);
                    }
            });
    });

    $("#home").on("click", function(event) {

        $("#bodyContainer").toggleClass("hide show");
        $("#homeContainer").toggleClass("hide show");
        console.log("this is clicking")
    });
    

     $("#right").on("click", function(event) {
        localStorage.setItem("cities",animals);
     });
    