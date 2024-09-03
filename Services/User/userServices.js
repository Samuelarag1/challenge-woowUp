"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var date_fns_1 = require("date-fns");
var UserService = /** @class */ (function () {
    function UserService(users, themes) {
        this.users = [];
        this.themes = [];
        this.users = users;
        this.themes = themes;
    }
    UserService.prototype.register = function (user) {
        this.users.push(user);
    };
    UserService.prototype.setTopics = function (user, theme) {
        this.themes.forEach(function (thm) {
            var _a;
            if (thm.name === theme.name) {
                (_a = user.want_recibe) === null || _a === void 0 ? void 0 : _a.push(thm);
            }
        });
    };
    UserService.prototype.getExpiredUnreadAlertsForUser = function (user) {
        var _a;
        var currentDate = new Date();
        var expiredUrgentAlerts = [];
        var expiredInformativeAlerts = [];
        (_a = user.want_recibe) === null || _a === void 0 ? void 0 : _a.forEach(function (theme) {
            var _a, _b;
            var alertDate = (0, date_fns_1.parse)(theme.alerts.expiration_date || "", "dd/MM/yyyy", new Date());
            if ((0, date_fns_1.isBefore)(alertDate, currentDate) && theme.alerts.read !== true) {
                if (((_a = theme.alerts) === null || _a === void 0 ? void 0 : _a.type) === "Urgentes") {
                    expiredUrgentAlerts.push(theme);
                }
                else if (((_b = theme.alerts) === null || _b === void 0 ? void 0 : _b.type) === "Informativas") {
                    expiredInformativeAlerts.push(theme);
                }
            }
        });
        expiredUrgentAlerts.reverse();
        return __spreadArray(__spreadArray([], expiredUrgentAlerts, true), expiredInformativeAlerts, true);
    };
    UserService.prototype.getUnexpiredAlerts = function (user) {
        var _a;
        var currentDate = new Date();
        var urgentAlerts = [];
        var informativeAlerts = [];
        (_a = user.want_recibe) === null || _a === void 0 ? void 0 : _a.forEach(function (theme) {
            var _a, _b;
            var alertDate = (0, date_fns_1.parse)(theme.alerts.expiration_date || "", "dd/MM/yyyy", new Date());
            if ((0, date_fns_1.isAfter)(alertDate, currentDate)) {
                if (((_a = theme.alerts.type) === null || _a === void 0 ? void 0 : _a[0]) === "Urgentes") {
                    urgentAlerts.push(theme);
                }
                else if (((_b = theme.alerts.type) === null || _b === void 0 ? void 0 : _b[0]) === "Informativas") {
                    informativeAlerts.push(theme);
                }
            }
        });
        urgentAlerts.reverse();
        return __spreadArray(__spreadArray([], urgentAlerts, true), informativeAlerts, true);
    };
    return UserService;
}());
exports.UserService = UserService;
