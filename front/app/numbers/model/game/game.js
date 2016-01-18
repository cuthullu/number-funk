System.register([], function(exports_1) {
    var Game;
    return {
        setters:[],
        execute: function() {
            Game = (function () {
                function Game(obj) {
                    this.rounds = [];
                    this.points = 0;
                    this.solved = 0;
                    if (obj) {
                        for (var prop in obj)
                            this[prop] = obj[prop];
                    }
                }
                Game.prototype.resetGame = function () {
                    this.rounds = [];
                    this.points = 0;
                };
                Game.prototype.addRound = function (round) {
                    this.rounds.push(round);
                    this.currentRound = round;
                    this.solved = this.rounds.filter(function (r) { return r.solved; }).length;
                };
                Game.prototype.update = function (uGame) {
                    this.points = uGame.points;
                    this.name = uGame.name;
                    this.solved = uGame.solved;
                };
                Game.prototype.peekAtRounds = function () {
                    return this.rounds[this.rounds.length - 1];
                };
                Game.prototype.getSolved = function () {
                    this.solved = this.rounds.filter(function (r) { return r.solved; }).length;
                    return this.solved;
                };
                return Game;
            })();
            exports_1("Game", Game);
        }
    }
});
//# sourceMappingURL=game.js.map