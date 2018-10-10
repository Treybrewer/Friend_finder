var express = require("express");
var path = require("path");
var app = express();
// will return the entire friends arr
var friends = require("../data/friends.js");

// will return matched friend
var finalMatch = require("../data/matched.js");


module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
       
        return res.json(friends);
    });
    
    // will return single friend or false if not found
    app.get("/api/friends/:friend", function (req, res) {
        var chosen = req.params.friend;
    
        console.log(chosen);
    
        for (var i = 0; i < friends.length; i++) {
            if (chosen === friends[i].routeName) {
                return res.json(friends[i]);
            }
        }
    
        return res.json(false);
    });
    app.get("/api/finalMatch", function (req, res) {
        return res.json(finalMatch);
        
    });
};
