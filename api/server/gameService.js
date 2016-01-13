var Promise = require("promise");
var https = require("https");
var mongo = require("mongodb");

function GameService(db) {
    var games = db.collection("games");
    var self = this;

    this.createGame = function(game) {
        return new Promise(function(resolve, reject) {
            games.insertOne(game, function(err, thing) {
                if(err) {
                    reject({code: 500, msg: err});
                } else {
                    resolve(thing.insertedId);
                }
            })
        })
    };

    this.getGame = function(id) {
        return new Promise(function(resolve,reject) {
            games.findOne({_id: mongo.ObjectID(id)}, function(err, game){
                if (err) {
                    reject({code: 500, msg: err});
                } else if(game === undefined) {
                    reject({code: 404, msg: "Game not found with id: " + id});
                } else {
                    resolve(game);
                }
            });

        });
    };
    
    this.incPoints = function(id, points) {
      return new Promise(function(resolve, reject) {
            games.updateOne(
                {_id: mongo.ObjectID(id)},
                {
                    $inc : {"points" : points}
                },
                function(err,res){
                    if (err) {
                        reject({code: 500, msg: err});
                    } else if(res === undefined) {
                        reject({code: 404, msg: "Game not found with id: " + id});
                    } else {
                        resolve(res);
                    }
                }
            );
        });  
    };
    
    this.setName = function(id, name) {
        return new Promise(function(resolve,reject) {
            games.updateOne(
                {_id: mongo.ObjectID(id)},
                {
                    $set : {"name" : name}
                },
                function(err, res) {
                    if (err) {
                        reject({code: 500, msg: err});
                    } else if(res === undefined) {
                        reject({code: 404, msg: "Game not found with id: " + id});
                    } else {
                        resolve(res);
                    }
                }
            ); 
        });
    }
}

module.exports = GameService;
