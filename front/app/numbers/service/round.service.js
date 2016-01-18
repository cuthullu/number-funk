System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../model/round', './apiConnection.service', './toast.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, round_1, apiConnection_service_1, toast_service_1;
    var RoundService;
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
            function (round_1_1) {
                round_1 = round_1_1;
            },
            function (apiConnection_service_1_1) {
                apiConnection_service_1 = apiConnection_service_1_1;
            },
            function (toast_service_1_1) {
                toast_service_1 = toast_service_1_1;
            }],
        execute: function() {
            RoundService = (function () {
                function RoundService(http, _apiConnectionService, _toastService) {
                    var _this = this;
                    this.http = http;
                    this._apiConnectionService = _apiConnectionService;
                    this._toastService = _toastService;
                    this._rounds = [];
                    this._result = false;
                    this.updateRound = function (round) {
                        var url = _this._apiConnectionService.getHost() + "/rounds/" + round._id;
                        _this.http.get(url).subscribe(function (data) {
                            _this._rounds.forEach(function (round) {
                                if (round._id === data.json()._id) {
                                    round.update(data.json());
                                }
                            });
                            console.log("rounds", _this, _this._rounds);
                            //this._roundsObserver.next(this._rounds);
                        }, function (err) { return _this._toastService.addToast(err, "danger"); });
                    };
                    this.getRounds = function (game) {
                        var url = _this._apiConnectionService.getHost() + "/game/" + game._id + "/rounds";
                        _this.http.get(url).subscribe(function (data) {
                            data.json().forEach(function (jRound) {
                                _this._rounds.push(new round_1.Round(jRound));
                            });
                            _this._roundsObserver.next(_this._rounds);
                        }, function (err) { return _this._toastService.addToast(err, "danger"); });
                    };
                    this.runResult = function (game, round, json) {
                        round.solved = json.result;
                        if (json.result === true) {
                            _this._toastService.addToast("Aye well done you got " + round.points + " points that round", "success");
                            game.points += round.points;
                        }
                        else {
                            _this._toastService.addToast("You failed. I'm taking one of your points. Don't fail again, failure.", "warning");
                            round.points--;
                        }
                        _this._resultObserver.next(json.result);
                        _this.updateRound(round);
                    };
                    this.rounds$ = new Observable_1.Observable(function (observer) {
                        return _this._roundsObserver = observer;
                    }).share();
                    this.result$ = new Observable_1.Observable(function (observer) {
                        return _this._resultObserver = observer;
                    }).share();
                }
                RoundService.prototype.reqNewRound = function (game) {
                    var _this = this;
                    var url = this._apiConnectionService.getHost() + "/game/" + game._id + "/rounds/new";
                    this.http.get(url).subscribe(function (data) {
                        _this._rounds.push(new round_1.Round(data.json()));
                        _this._roundsObserver.next(_this._rounds);
                    }, function (err) { return _this._toastService.addToast(err, "danger"); });
                };
                RoundService.prototype.reqClue = function (round) {
                    var _this = this;
                    var url = this._apiConnectionService.getHost() + "/rounds/" + round._id + "/clue";
                    this.http.get(url).subscribe(function (data) {
                        if (data.json().newClue === false) {
                            _this._toastService.addToast("No more clue available for this number...soz", "info");
                        }
                        _this.updateRound(round);
                    }, function (err) { return _this._toastService.addToast(err, "danger"); });
                };
                RoundService.prototype.postSolution = function (game, round, answer) {
                    var _this = this;
                    var url = this._apiConnectionService.getHost() + "/game/" + game._id + "/rounds/" + round._id + "/solve";
                    var body = JSON.stringify({ answer: answer });
                    this.http.post(url, body).subscribe(function (data) { return _this.runResult(game, round, data.json()); }, function (err) { return _this._toastService.addToast(err, "danger"); });
                };
                RoundService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, apiConnection_service_1.ApiConnectionService, toast_service_1.ToastService])
                ], RoundService);
                return RoundService;
            })();
            exports_1("RoundService", RoundService);
        }
    }
});
//# sourceMappingURL=round.service.js.map