var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("app/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

var friends = require("./app/data/friends.js");

app.post("/api/friends", function (req, res) {

    var newFriend = req.body;

    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

    friends.push(newFriend);

    var newArray = [];
    var subtractionArray = [];
    res.json(newFriend);
    for (var i = 0; i < 10; i++) {

        newArray.push(parseInt(newFriend.answer[i]));
        if (newArray.length > 0) {
            subtract();
        }

    }
    function subtract() {
        var result = newArray[i] - friends[0].answer[i];
        subtractionArray.push(Math.abs(result));
        if (subtractionArray.length === 10) {
            var subtractResult = subtractionArray[0] + subtractionArray[1] + subtractionArray[2] + subtractionArray[3] + subtractionArray[4] + subtractionArray[5] + subtractionArray[6] + subtractionArray[7] + subtractionArray[8] + subtractionArray[9];
            console.log(`
            *************** New Friend Array ******************\n
                            name: ${newFriend.name}\n
                            age: ${newFriend.age}\n
                            imageURL: ${newFriend.image}\n
                            bio: ${newFriend.bio}\n
                            routeName: ${newFriend.routeName}\n
            **************************************************\n
            *************** ${newFriend.name} Answer Array *******************\n
                            ${newArray}\n
            **************************************************\n
            *************** Chucks Array ***********************\n
                            ${friends[0].answer}\n
            **************************************************\n
            *************** Answer Array - Chucks Array ********\n
                            ${subtractionArray}\n
            **************************************************\n
            *************** Result *****************************\n
                            ${subtractResult}\n
            **************************************************`);
        };
    };

});


app.listen(PORT, function () {

    console.log("Server listening on: http://localhost:" + PORT);
});