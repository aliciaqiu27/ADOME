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

// $("#left").on("click", function (event) {
//     buttonEventListener()
// });

$("#loved").on("click", function (event) {
    savedPets();
});
