var server = require("./expressServer");
var MongoClient = require("mongodb").MongoClient;
var port = process.env.PORT || 3003;
var dbUri ='mongodb://192.168.99.100/meal-planner';
var mongo = require("mongodb");
MongoClient.connect(dbUri, function (err, db) {
    if (err) {
        console.log("Failed to connect to db", err);
        dbUri ='mongodb://127.0.0.1/meal-planner';
        MongoClient.connect(dbUri, function (err, db) {
		    if (err) {
		        console.log("Failed to connect to db", err);
		        return;
		    }

		    server(port, db);
		    console.log("Server running on port " + port);
		});
    }

    server(port, db);
    console.log("Server running on port " + port);
});
