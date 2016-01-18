System.register(['angular2/core', '../model/toast'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, toast_1;
    var ToastService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (toast_1_1) {
                toast_1 = toast_1_1;
            }],
        execute: function() {
            ToastService = (function () {
                function ToastService() {
                    this.toasts = [];
                    this.LIFETIME_DEFULT = 5000;
                }
                ToastService.prototype.addToast = function (message, level, lifetime) {
                    var _this = this;
                    lifetime = lifetime === undefined ? this.LIFETIME_DEFULT : lifetime;
                    var toast = new toast_1.Toast(message, level, lifetime);
                    this.toasts.push(toast);
                    setTimeout(function () {
                        return _this.toasts.splice(_this.toasts.indexOf(toast, 1));
                    }, toast.lifetime);
                };
                ToastService.prototype.getToasts = function () {
                    return this.toasts;
                };
                ToastService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ToastService);
                return ToastService;
            })();
            exports_1("ToastService", ToastService);
        }
    }
});
//# sourceMappingURL=toast.service.js.map