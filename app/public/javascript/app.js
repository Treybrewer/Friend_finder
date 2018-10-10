
$("#submit").on("click", function (event) {

    event.preventDefault();

    if ($(".form-control").val() === "") {
        alert("Please fill out the rest of the form!");
        return;
    };
    
    var input1 = $("#inputState1").val().trim();
    var input2 = $("#inputState2").val().trim();
    var input3 = $("#inputState3").val().trim();
    var input4 = $("#inputState4").val().trim();
    var input5 = $("#inputState5").val().trim();
    var input6 = $("#inputState6").val().trim();
    var input7 = $("#inputState7").val().trim();
    var input8 = $("#inputState8").val().trim();
    var input9 = $("#inputState9").val().trim();
    var input10 = $("#inputState10").val().trim();
    var input = [input1, input2, input3, input4, input5, input6, input7, input8, input9, input10]
    answers = [];
    // validation for the form
    for (var i = 0; i < 10; i++) {
        if (input[i] === "Select an option") {
            alert("Please fill out the rest of the form!");
            return;
        }

        else {
            answers.push(input[i]);
        };
    };
    // to ensure post function only runs once
    if (answers.length === 10) {
        post();
    };


    function post() {
        var newFriend = {
            name: $("#name").val().trim(),
            age: $("#age").val().trim(),
            image: $("#photo").val().trim(),
            bio: $("#bio").val().trim(),
            answer: answers
        };

        $.post("/api/friends", newFriend)
            .then(function (data) {
                console.log("add.html", data);

            });

    };


    function returnFunc() {
        $.get("/api/finalMatch", function (finalMatch) {
            console.log(finalMatch);
            console.log(finalMatch[0].Name);
            var div = $("<div class='info'>");
            var p = $("<p>");
            p.text("Name:  " + finalMatch[0].Name);
            var img = $("<img>");
            img.attr("src", finalMatch[0].Image);
            img.css('height', '300');
            img.css('width', '300');
            var p2 = $("<p>");
            p2.text("Age:  " + finalMatch[0].Age);
            var p3 = $("<p>");
            p3.text("Bio:  " + finalMatch[0].Bio);
            div.append(p, img, p2, p3);
            $(".modal-body").append(div);
            $(".modal").show();
        });
    };
    returnFunc();
});


$(".close").on("click", function (event) {
    $(".modal").hide();
    $("#name").val("");
    $("#age").val("");
    $("#photo").val("");
    $("#bio").val("");
    $("#inputState1").val("");
    $("#inputState2").val("");
    $("#inputState3").val("");
    $("#inputState4").val("");
    $("#inputState5").val("");
    $("#inputState6").val("");
    $("#inputState7").val("");
    $("#inputState8").val("");
    $("#inputState9").val("");
    $("#inputState10").val("");
    $(".info").detach();

});