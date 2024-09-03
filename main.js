"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userServices_1 = require("./Services/User/userServices");
var themeServices_1 = require("./Services/Theme/themeServices");
var alertServices_1 = require("./Services/Alert/alertServices");
var users = [
    {
        id: 0,
        username: "Samuel",
        want_recibe: [
            {
                id: 0,
                name: "Tema 1",
                alerts: {
                    expiration_date: "01/12/2023",
                    expiration_hour: "22:30",
                    read: false,
                },
                type: "Informativa",
            },
            {
                id: 1,
                name: "Tema 2",
                alerts: {
                    expiration_date: "07/02/2029",
                    expiration_hour: "11:55",
                    read: false,
                },
                type: "Urgentes",
            },
        ],
        notifications: false,
    },
    { id: 1, username: "Jose", want_recibe: [], notifications: false },
    { id: 2, username: "Claudia", want_recibe: [], notifications: false },
    { id: 3, username: "Carlos", want_recibe: [], notifications: false },
];
var themes = [
    {
        id: 0,
        name: "Tema 1",
        alerts: { expiration_date: "01/12/2023", expiration_hour: "22:30" },
        type: "Informativa",
    },
    {
        id: 1,
        name: "Tema 2",
        alerts: { expiration_date: "07/02/2029", expiration_hour: "11:55" },
        type: "Urgentes",
    },
    {
        id: 2,
        name: "Tema 3",
        alerts: { expiration_date: "03/10/2021", expiration_hour: "10:28" },
        type: "Informativa",
    },
];
//* Tema y Usuario de prueba
var testUser = users[0];
var testTheme = themes[0];
//* Declaracion de los servicios
var userService = new userServices_1.UserService(users, themes);
var themeService = new themeServices_1.ThemeService(users, themes);
var alertService = new alertServices_1.AlertService(users, themes);
//! Constantes a utilizar en las prubeas.
var newUser = {
    id: 4,
    username: "TestUser",
    want_recibe: [],
    notifications: true,
};
var newTheme = {
    id: 3,
    name: "Notificacion de Facebook",
    alerts: {
        expiration_date: "22/04/2028",
        expiration_hour: "13:25",
        active: true,
    },
    type: "Informativa",
};
// Depuracion
{
    //! Add user, working.
    console.log(users);
    userService.register(newUser);
    console.log(users);
    //! Add Theme, working.
    themeService.setTheme(newTheme);
    //! Add theme to user, working.
    userService.setTopics(testUser, testTheme);
    //! Send alert to all users, working.
    alertService.sendAlertToAllUsers(testTheme);
    //! Send alert to specify user, working.
    alertService.sendAlertToSpecifyUser(testUser, testTheme);
    //! Check alert like read, working.
    alertService.markAsRead(testUser, testTheme);
    //! Get all expired alerts, working.
    var expiredAlerts = userService.getExpiredUnreadAlertsForUser(testUser);
    //! Get all unexpired alerts, working.
    var unExpiredAlerts = userService.getUnexpiredAlerts(testUser);
}
