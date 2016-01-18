System.register(['angular2/core', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var NumberService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            NumberService = (function () {
                function NumberService(http) {
                    this.http = http;
                }
                NumberService.prototype.requestClue = function (round) {
                    this.getClue(round, 0);
                };
                NumberService.prototype.getClue = function (round, attempt) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('X-Mashape-Key', 'Tkvkv3nGSJmshbKhgWUUMoaZ55Byp1pDVAwjsnaAaDNRhrIWic');
                    headers.append('Accept', 'application/json');
                    this.http.get('https://numbersapi.p.mashape.com/' + round.number + '/math', { headers: headers })
                        .subscribe(function (data) {
                        var json = data.json();
                        if (json.found) {
                            round.addClue(json);
                        }
                        else {
                            round.resetRound();
                            _this.requestClue(round);
                        }
                    }, function (err) { return console.error(err); }, function () { return console.log("Clue request done"); });
                };
                NumberService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], NumberService);
                return NumberService;
            })();
            exports_1("NumberService", NumberService);
        }
    }
});
//# sourceMappingURL=number.service.js.map