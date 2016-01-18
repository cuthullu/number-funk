System.register(['angular2/core', "angular2/router", './../../service/game.service', '../game/game.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, game_service_1, game_component_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (game_service_1_1) {
                game_service_1 = game_service_1_1;
            },
            function (game_component_1_1) {
                game_component_1 = game_component_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(_router, _gameService) {
                    this._router = _router;
                    this._gameService = _gameService;
                    this.myShow = false;
                }
                DashboardComponent.prototype.newGame = function () {
                    var _this = this;
                    this._gameService.game$.subscribe(function (newGame) {
                        _this.game = newGame;
                        _this.myShow = true;
                        _this._router.navigate(["Game", { game: _this.game._id }]);
                    });
                    this._gameService.reqNewGame();
                };
                DashboardComponent.prototype.isShow = function () {
                    return this.myShow;
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'dashboard-component',
                        templateUrl: 'app/numbers/component/dashboard/dashboard.html',
                        directives: [game_component_1.GameComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, game_service_1.GameService])
                ], DashboardComponent);
                return DashboardComponent;
            })();
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map