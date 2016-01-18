System.register(['angular2/core', '../../service/toast.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, toast_service_1;
    var ToastComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (toast_service_1_1) {
                toast_service_1 = toast_service_1_1;
            }],
        execute: function() {
            ToastComponent = (function () {
                // You failed. I'm taking one of your points. Don't fail again, failure.
                function ToastComponent(_toastService) {
                    this._toastService = _toastService;
                }
                ToastComponent.prototype.ngOnInit = function () {
                    this.toasts = this._toastService.getToasts();
                };
                ToastComponent = __decorate([
                    core_1.Component({
                        selector: 'toast-container',
                        templateUrl: 'app/numbers/component/toast/toast.html',
                    }), 
                    __metadata('design:paramtypes', [toast_service_1.ToastService])
                ], ToastComponent);
                return ToastComponent;
            })();
            exports_1("ToastComponent", ToastComponent);
        }
    }
});
//# sourceMappingURL=toast.component.js.map