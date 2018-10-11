var express = require("express");

var bodyParser = require("body-parser");

var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("app/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routing/apiroutes.js')(app);
require('./app/routing/htmlroutes.js')(app);

var friends = require("./app/data/friends.js");
var finalMatch = require("./app/data/matched");


app.post("/api/friends", function (req, res) {
    
    finalMatch.splice(0,1);

    var newFriend = req.body;

    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

    friends.push(newFriend);

    var newArray = [];
    var subtractionArray = [];
    var finalResult = [];
    
    res.json(newFriend);
    
    for (var i = 0; i < 10; i++) {
        newArray.push(parseInt(newFriend.answer[i]));
    };

    function Subtract(index, name) {
        this.ran = false;
        this.index = index;
        this.name = name;
        this.run = function () {

            for (var i = 0; i < 10; i++) 
            
            {
                var operation = newArray[i] - this.index.answer[i];

                subtractionArray.push(Math.abs(operation));

                if (subtractionArray.length === 10)
                 {
                    var subtractResult = subtractionArray[0] + subtractionArray[1] + subtractionArray[2] + subtractionArray[3] + subtractionArray[4] + subtractionArray[5] + subtractionArray[6] + subtractionArray[7] + subtractionArray[8] + subtractionArray[9];

                    finalResult.push(subtractResult);

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

                    subtractionArray = [];

                };

            };

        };

    };

    switch (finalResult.length) {
        case 0:
            var chuck = new Subtract(friends[0], "Chuck");
            chuck.run();

        case 1:
            var arnold = new Subtract(friends[1], "Arnold");
            arnold.run();

        case 2:
            var sylvester = new Subtract(friends[2], "Sylvester");
            sylvester.run();

        case 3:
            var clint = new Subtract(friends[3], "Clint");
            clint.run();

        case 4:
            var john = new Subtract(friends[4], "John");
            john.run();

        case 5:
            var steve = new Subtract(friends[5], "Steve");
            steve.run();

        case 6:
            var brock = new Subtract(friends[6], "Brock");
            brock.run();

        case 7:
            var mel = new Subtract(friends[7], "Mel");
            mel.run();

        case 8:
            var terry = new Subtract(friends[8], "Terry");
            terry.run();

        case 9:
            var denzel = new Subtract(friends[9], "Denzel");
            denzel.run();


    };

    var match = Math.min(...finalResult);

    var matchIndex = finalResult.indexOf(match);

    var matchedFriend = {
        RouteName: friends[matchIndex].routeName,
        Name: friends[matchIndex].name,
        Age: friends[matchIndex].age,
        Bio: friends[matchIndex].bio,
        Image: friends[matchIndex].image

    };

    finalMatch.push(matchedFriend);
    
});

friends.splice(10,1);

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});