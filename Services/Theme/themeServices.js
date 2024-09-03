"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeService = void 0;
var ThemeService = /** @class */ (function () {
    function ThemeService(users, themes) {
        this.users = [];
        this.themes = [];
        this.users = users;
        this.themes = themes;
    }
    ThemeService.prototype.setTheme = function (theme) {
        this.themes.push(theme);
    };
    ThemeService.prototype.alertReaded = function (user, theme) {
        var _this = this;
        var _a, _b;
        var alertTheme = (_a = this.themes) === null || _a === void 0 ? void 0 : _a.filter(function (themeAux) { return themeAux.name === theme.name; });
        if (alertTheme) {
            var _loop_1 = function (i) {
                (_b = this_1.users[i].want_recibe) === null || _b === void 0 ? void 0 : _b.map(function (theme) {
                    if (theme.name === alertTheme[0].name &&
                        _this.users[i].username === user.username) {
                        alertTheme[0].alerts.read = true;
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.users.length; i++) {
                _loop_1(i);
            }
        }
        return alertTheme;
    };
    return ThemeService;
}());
exports.ThemeService = ThemeService;
