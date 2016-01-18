var Promise = require("promise");
var mongo = require("mongodb");

function DayService(db) {

    var days = db.collection("days");
    var self = this;

    this.getDays = function (user){
        return new Promise(function (resolve, reject) {
            days.find({user: user}).toArray(function(err, days) {
                if(err) {
                    reject({code:500, msg:err});
                }else {
                    resolve(days)
                }
            });
        });
    };

    this.getDay = function(id) {
        return new Promise(function (resolve, reject) {
            days.findOne({_id: mongo.ObjectID(id)}, function(err, day){
                if (err) {
                    reject({code: 500, msg: err});
                } else if(day === undefined) {
                    reject({code: 404, msg: "Day not found with id: " + id});
                } else {
                    resolve(day);
                }
            });
        });
    };

    this.addDay = function(day) {
        return new Promise(function(resolve, reject) {
            days.insertOne(day, function(err, thing) {
                if(err) {
                    reject({code: 500, msg: err});
                } else {
                    resolve(thing.insertedId);
                }
            })
        })
    };

    this.updateDay = function(day) {
        return new Promise(function(resolve, reject)  {
            days.updateOne({_id: mongo.ObjectID(day._id)}, {$set: {meals: day.meals}},  function (err, thing) {
                if (err) {
                    reject({code: 500, msg: err});
                } else {
                    resolve();
                }
            })
        })   
    }
}

module.exports = DayService;
