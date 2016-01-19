var express = require("express");
var path = require('path');
var cookieParser = require("cookie-parser");
var DayService = require("./dayService.js");
var GameService= require("./gameService.js");
var NumberService = require("./numberService.js");
var RoundService = require("./roundService.js");
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
      res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
      next();
    });

    var gameService = new GameService(db);
    var roundService = new RoundService(db);
    var numberService = new NumberService("Tkvkv3nGSJmshbKhgWUUMoaZ55Byp1pDVAwjsnaAaDNRhrIWic");

    router.route("/game")
        .post(function (req,res) {
            var game = {
                points : 0,
                solved : 0,
                name : req.body.name
            }
            
            gameService.createGame(game)
                .then(function(id) {
                    res.set("location", "api/game/" + id);
                    res.json({id: id});
                }).catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        });
    router.route("/game/:game")
        .get(function(req,res) {
            var gameId = req.params.game;
            gameService.getGame(gameId)
                .then(function(game){
                    res.json(game);
                }).catch(function(err) {
                     res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        })
        
    router.route("/game/:game/rounds")
        .get(function(req, res) {
            var gameId = req.params.game;
            roundService.getRounds(gameId)
                .then(function(rounds){
                    for(var round of rounds){
                        sanitizeRound(round);
                    }
                    res.json(rounds)
                }).catch(function(err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        })

    router.route("/game/:game/rounds/new")
        .get(function (req, res){
            var gameId = req.params.game;
            roundService.getPreviousNumbers(gameId)
                .then(numberService.getNumberFact)
                .then(function(parsed){
                    return roundService.createRound(parsed, gameId);
                }).then(function(round) {
                    sanitizeRound(round);
                    res.json(round);
                }).catch(function(err) {
                     res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        });
        
    router.route("/game/:game/name")
        .post(function (req,res) {
            var name = req.body.name;
            var gameId = req.params.game;
            gameService.setName(gameId,name)
                .then(function(){
                    res.sendStatus(200);
                }).catch(function(err) {
                     res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        });
        
    router.route("/rounds/:round")
        .get(function(req,res) {
            var id = req.params.round
            roundService.getRound(id)
                .then(function (round) {
                    sanitizeRound(round);
                    res.json(round)
                })
                .catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        });
        
    router.route("/rounds/:round/clue")
        .get(function(req,res) {
           var roundId = req.params.round;
           var returnClue;
           roundService.getRound(roundId)
            .then(function(round) {
                return numberService.getNewClue(round.number, round.clues);
            })
            .then(function(newClue) {
                if(newClue){
                    returnClue = newClue;
                    return roundService.addClue(roundId,newClue.text);
                }else{
                    res.json({newClue : false});
                }
            }).then(function(){
                res.json({clue: returnClue,penalty : -1});
            }).catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
            });
        });
        
    router.route("/game/:game/rounds/:round/solve")
        .post(function(req, res) {
            var gameId = req.params.game;
            var roundId = req.params.round;
            var answer = req.body.answer;
            var correct = false;
            roundService.getRound(roundId)
                .then(function(round){
                    if(round.number === answer){
                        correct = true;
                        return roundService.setRoundSolved(roundId)
                            .then(function(){
                                return gameService.incPoints(gameId,round.points);
                            });
                    } else if(round.points > 0){
                        return roundService.decPoints(roundId);
                    }
                }).then(function(){
                    res.json({'result': correct});
                }).catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        });
        
    router.route("/table")
        .get(function(req, res) {
           gameService.getTopGames(10)
            .then(function(games) {
                res.json(games);
            }).catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
            });
        });

       app.use("/api", router);
       var renderIndex = function(req, res) {
            res.sendFile(path.resolve('public/index.html'));
       }
       app.use("/*", renderIndex);
       
       
    function sanitizeRound(round){
        if(!round.solved) {
            delete round.number;
        }
        return round;
    }
    

    return app.listen(port);
};
