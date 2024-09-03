"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertService = void 0;
var AlertService = /** @class */ (function () {
    function AlertService(users, themes) {
        this.themes = [];
        this.users = [];
        this.themes = themes;
        this.users = users;
    }
    AlertService.prototype.sendAlertToSpecifyUser = function (user, theme) {
        var userFinded = this.users.find(function (usr) { return usr.username === user.username; });
        if (userFinded) {
            this.themes.find(function (themeAux) {
                var _a;
                if (themeAux.name !== theme.name) {
                    return (_a = userFinded.want_recibe) === null || _a === void 0 ? void 0 : _a.push(themeAux);
                }
            });
        }
        return userFinded;
    };
    AlertService.prototype.sendAlertToAllUsers = function (theme) {
        this.users.forEach(function (user) {
            var _a, _b;
            (_a = user.want_recibe) === null || _a === void 0 ? void 0 : _a.push(theme);
            (_b = user.want_recibe) === null || _b === void 0 ? void 0 : _b.map(function (userAlerts) {
                if (userAlerts.name === theme.name)
                    userAlerts.alerts.active = true;
            });
        });
    };
    AlertService.prototype.markAsRead = function (user, theme) {
        var _a;
        var readTheme = (_a = user.want_recibe) === null || _a === void 0 ? void 0 : _a.find(function (tema) { return tema.name === theme.name; });
        if (readTheme)
            readTheme.alerts.read = true;
        return user;
    };
    return AlertService;
}());
exports.AlertService = AlertService;
