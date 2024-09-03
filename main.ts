import IMUsers from "./Models/IMUser";
import IMThemes from "./Models/IThemes";
import { UserService } from "./Services/User/userServices";
import { ThemeService } from "./Services/Theme/themeServices";
import { AlertService } from "./Services/Alert/alertServices";

const users: IMUsers[] = [
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

const themes: IMThemes[] = [
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
const testUser: IMUsers = users[0];
const testTheme: IMThemes = themes[0];

//* Declaracion de los servicios
const userService = new UserService(users, themes);
const themeService = new ThemeService(users, themes);
const alertService = new AlertService(users, themes);

//! Constantes a utilizar en las prubeas.
const newUser: IMUsers = {
  id: 4,
  username: "TestUser",
  want_recibe: [],
  notifications: true,
};

const newTheme: IMThemes = {
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
  const expiredAlerts = userService.getExpiredUnreadAlertsForUser(testUser);

  //! Get all unexpired alerts, working.
  const unExpiredAlerts = userService.getUnexpiredAlerts(testUser);
}
