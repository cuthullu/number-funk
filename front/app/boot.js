System.register(['angular2/platform/browser', 'angular2/router', 'angular2/http', 'angular2/core', './app.component', './numbers/service/number.service', './numbers/service/game.service', './numbers/service/round.service', './numbers/service/toast.service', './numbers/service/apiConnection.service'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var browser_1, router_1, http_1, core_1, app_component_1, number_service_1, game_service_1, round_service_1, toast_service_1, apiConnection_service_1;
    var headers, MyOptions;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
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
            function (toast_service_1_1) {
                toast_service_1 = toast_service_1_1;
            },
            function (apiConnection_service_1_1) {
                apiConnection_service_1 = apiConnection_service_1_1;
            }],
        execute: function() {
            headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            MyOptions = (function (_super) {
                __extends(MyOptions, _super);
                function MyOptions() {
                    _super.apply(this, arguments);
                    this.headers = headers;
                }
                return MyOptions;
            })(http_1.BaseRequestOptions);
            browser_1.bootstrap(app_component_1.AppComponent, [
                apiConnection_service_1.ApiConnectionService,
                number_service_1.NumberService,
                game_service_1.GameService,
                round_service_1.RoundService,
                toast_service_1.ToastService,
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                core_1.provide(http_1.RequestOptions, { useClass: MyOptions })
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map