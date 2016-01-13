var Promise = require("promise");
var https = require("https");
var mongo = require("mongodb");

function RoundService(db) {
    var rounds = db.collection("rounds");
    var maxPoints = 10;

    this.createRound = function(numberFact, game) {
        var round = {
            clues : [numberFact.text],
            number: numberFact.number,
            game: game,
            points: maxPoints,
            solved: false
        }
        return new Promise(function(resolve, reject) {
            rounds.insertOne(round, function(err, thing) {
                if(err) {
                    reject({code: 500, msg: err});
                } else {
                    round._id = thing.insertedId;
                    resolve(round);
                }
            })
        })
    };
    
    this.getPreviousNumbers = function(gameId){
        return new Promise(function(resolve, reject){
           rounds.find({'game': gameId}).map(returnNumber).toArray(function(err,numbers){
               if(err) {
                    reject({code:500, msg:err});
                }else {
                    resolve(numbers);
                }
           });
        });
    };
    
    this.getRound = function(id) {
        return new Promise(function(resolve,reject) {
            rounds.findOne({_id: mongo.ObjectID(id)}, function(err, round){
                if (err) {
                    reject({code: 500, msg: err});
                } else if(round === undefined) {
                    reject({code: 404, msg: "Round not found with id: " + id});
                } else {
                    resolve(round);
                }
            });

        });
    }
    
    this.decPoints = function(id) {
        return new Promise(function(resolve, reject) {
            rounds.updateOne(
                {_id: mongo.ObjectID(id), "points" : {$gt: 0}},
                {
                    $inc : {"points" : -1}
                },
                function(err,res){
                   if (err) {
                        reject({code: 500, msg: err});
                    } else if(res === undefined) {
                        reject({code: 404, msg: "Round not found with id: " + id});
                    } else {
                        resolve(res);
                    }
                }
            );
        });
    }
    
    this.setRoundSolved = function(id) {
        return new Promise(function(resolve, reject) {
            rounds.updateOne(
                {_id: mongo.ObjectID(id)},
                {
                    $set : {"sovled" : true}
                },
                function(err,res){
                   if (err) {
                        reject({code: 500, msg: err});
                    } else if(res === undefined) {
                        reject({code: 404, msg: "Round not found with id: " + id});
                    } else {
                        resolve(res);
                    }
                }
            );
        });
    }
    
    this.addClue = function(id,clue) {
        return new Promise(function(resolve, reject) {
            rounds.updateOne(
                {_id: mongo.ObjectID(id)},
                {
                    $inc: { 'points' : -1},
                    $push: { 'clues' : clue}
                },
                function(err,res){
                   if (err) {
                        reject({code: 500, msg: err});
                    } else if(res === undefined) {
                        reject({code: 404, msg: "Round not found with id: " + id});
                    } else {
                        resolve(res);
                    }
                }   
            );
        })
    }
   
    function returnNumber(round){
        return round.number;
    }
}

module.exports = RoundService;
