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
    };
    
    function Subtract(index, name) {
        this.index = index;
        this.name = name;
        this.run = function() {
            for(var i = 0; i < 10; i++) {
                var operation = newArray[i] - this.index.answer[i];
                subtractionArray.push(Math.abs(operation));
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
                    *************** ${this.name} Array ***********************\n
                                    ${this.index.answer}\n
                    **************************************************\n
                    *************** Answer Array - ${this.name} Array ********\n
                                    ${subtractionArray}\n
                    **************************************************\n
                    *************** ${newFriend.name} and ${this.name} Differences *******\n
                                    ${subtractResult}\n
                    **************************************************`);
                };
            };
        };
        
      
       
    };

    var chuck = new Subtract(friends[0], "Chuck");
    chuck.run();
    var arnold = new Subtract(friends[1], "Arnold");
    arnold.run();

});


app.listen(PORT, function () {

    console.log("Server listening on: http://localhost:" + PORT);
});