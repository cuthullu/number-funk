System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/add/operator/share', '../model/game/game', './apiConnection.service', './toast.service', './round.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, game_1, apiConnection_service_1, toast_service_1, round_service_1;
    var GameService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (game_1_1) {
                game_1 = game_1_1;
            },
            function (apiConnection_service_1_1) {
                apiConnection_service_1 = apiConnection_service_1_1;
            },
            function (toast_service_1_1) {
                toast_service_1 = toast_service_1_1;
            },
            function (round_service_1_1) {
                round_service_1 = round_service_1_1;
            }],
        execute: function() {
            GameService = (function () {
                function GameService(http, _apiConnectionService, _toastService, _roundService) {
                    var _this = this;
                    this.http = http;
                    this._apiConnectionService = _apiConnectionService;
                    this._toastService = _toastService;
                    this._roundService = _roundService;
                    this.game$ = new Observable_1.Observable(function (observer) {
                        return _this._gameObserver = observer;
                    }).share();
                }
                GameService.prototype.reqGame = function (id) {
                    var _this = this;
                    var url = this._apiConnectionService.getHost() + "/game/" + id;
                    this.http.get(url).subscribe(function (data) {
                        var g = new game_1.Game(data.json());
                        _this._roundService.getRounds(g);
                        _this._roundService.rounds$.subscribe(function (rounds) {
                            g.rounds = rounds;
                            if (g.rounds.length === 0) {
                                _this._roundService.reqNewRound(g);
                            }
                            else {
                                g.currentRound = g.peekAtRounds();
                            }
                            _this._gameObserver.next(g);
                        });
                        _this._gameObserver.next(g);
                    }, function (err) { return _this._toastService.addToast(err, "danger", 3000); });
                };
                GameService.prototype.reqNewGame = function () {
                    var _this = this;
                    var url = this._apiConnectionService.getHost() + "/game";
                    this.http.get(url).subscribe(function (data) {
                        var g = new game_1.Game(data.json());
                        _this._gameObserver.next(g);
                    }, function (err) { return _this._toastService.addToast(err, "danger", 3000); });
                };
                GameService.prototype.setGameName = function (id, name) {
                    var _this = this;
                    var url = this._apiConnectionService.getHost() + "/game/" + id + "/name";
                    this.http.post(url, JSON.stringify({ name: name })).subscribe(function () { return _this._toastService.addToast("Name Submitted good", "success", 3000); }, function (err) { return _this._toastService.addToast(err, "danger", 3000); });
                };
                GameService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, apiConnection_service_1.ApiConnectionService, toast_service_1.ToastService, round_service_1.RoundService])
                ], GameService);
                return GameService;
            })();
            exports_1("GameService", GameService);
        }
    }
});
//# sourceMappingURL=game.service.js.map