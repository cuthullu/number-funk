System.register([], function(exports_1) {
    var Toast;
    return {
        setters:[],
        execute: function() {
            Toast = (function () {
                function Toast(message, level, lifetime) {
                    this.message = message;
                    this.level = level;
                    this.lifetime = lifetime;
                }
                return Toast;
            })();
            exports_1("Toast", Toast);
        }
    }
});
//# sourceMappingURL=toast.js.map