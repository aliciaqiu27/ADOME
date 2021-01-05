
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


    let descriptionText = animals.data[currentAnimal].attributes.descriptionText;
    $(".descriptionTextDiv").append(descriptionText);

}

