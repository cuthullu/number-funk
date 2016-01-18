System.register(['angular2/core', "angular2/router", './../../service/number.service', './../../service/game.service', './../../service/round.service', '../round/round.component', '../toast/toast.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, number_service_1, game_service_1, round_service_1, round_component_1, toast_component_1;
    var GameComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (number_service_1_1) {
                number_service_1 = number_service_1_1;
            },
            function (game_service_1_1) {
                game_service_1 = game_service_1_1;
            },
            function (round_service_1_1) {
                round_service_1 = round_service_1_1;
            },
            function (round_component_1_1) {
                round_component_1 = round_component_1_1;
            },
            function (toast_component_1_1) {
                toast_component_1 = toast_component_1_1;
            }],
        execute: function() {
            GameComponent = (function () {
                function GameComponent(_routeParams, _numberService, _gameService, _roundService) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._numberService = _numberService;
                    this._gameService = _gameService;
                    this._roundService = _roundService;
                    this.giveUp = function () {
                        _this.addRound();
                    };
                    this.solved = function (points) {
                        _this.game.points += points;
                        _this.addRound();
                    };
                }
                GameComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._gameService.game$.subscribe(function (sGame) {
                        if (_this.game === undefined) {
                            _this.game = sGame;
                        }
                        else {
                            _this.game.update(sGame);
                        }
                    });
                    this._gameService.reqGame(this._routeParams.params.game);
                    this._roundService.result$.subscribe(function (result) {
                        if (result === true) {
                            _this.addRound();
                        }
                    });
                };
                GameComponent.prototype.addRound = function () {
                    this._roundService.reqNewRound(this.game);
                };
                GameComponent.prototype.saveName = function () {
                    this._gameService.setGameName(this.game._id, this.game.name);
                };
                GameComponent = __decorate([
                    core_1.Component({
                        selector: 'game-component',
                        templateUrl: 'app/numbers/component/game/game.html',
                        directives: [round_component_1.RoundComponent, toast_component_1.ToastComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, number_service_1.NumberService, game_service_1.GameService, round_service_1.RoundService])
                ], GameComponent);
                return GameComponent;
            })();
            exports_1("GameComponent", GameComponent);
        }
    }
});
//# sourceMappingURL=game.component.js.map