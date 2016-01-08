var express = require("express");
var cookieParser = require("cookie-parser");
var DayService = require("./dayService.js");
var bodyParser = require("body-parser");

var ObjectId = require("mongodb").ObjectID;

module.exports = function (port, db) {
    var app = express();
    var router = express.Router();
    app.use(express.static("public"));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

    var users = db.collection("users");
    var messages = db.collection("messages");
    var dayService = new DayService(db);

    router.route("/days")
        .get(function (req, res) {
            var user  = req.query.user_id;

            dayService.getDays(user)
                .then(function (days) {
                    res.json(days)
                })
                .catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        })
        .post(function (req, res) {
            var day = req.body;
            dayService.addDay(day)
                .then(function(id) {
                    res.location(id);
                    res.sendStatus(201);
                })
        })
        .put(function (req, res) {
            var day = req.body;

            dayService.updateDay(day)
                .then(function () {
                    res.sendStatus(200);
                })
                .catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        });



    router.route("/day/:id")
        .get(function (req, res) {
            var id = req.params.id;
           
            dayService.getDay(id)
                .then(function (day) {
                    res.json(day);
                })
                .catch(function (err) {
                    res.sendStatus(err.code);
                });
        });
    app.use("/api", router);

    return app.listen(port);
};
