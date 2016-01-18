System.register([], function(exports_1) {
    var Round;
    return {
        setters:[],
        execute: function() {
            Round = (function () {
                function Round(jRound) {
                    this.solved = false;
                    this.max = 100;
                    if (jRound) {
                        this.update(jRound);
                    }
                }
                Round.prototype.update = function (jRound) {
                    for (var prop in jRound)
                        this[prop] = jRound[prop];
                };
                return Round;
            })();
            exports_1("Round", Round);
        }
    }
});
//# sourceMappingURL=round.js.map