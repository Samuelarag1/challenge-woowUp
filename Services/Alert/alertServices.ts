import IMThemes from "../../Models/IThemes";
import IMUser from "../../Models/IMUser";

export class AlertService {
  private themes: IMThemes[] = [];
  private users: IMUser[] = [];

  constructor(users: IMUser[], themes: IMThemes[]) {
    this.themes = themes;
    this.users = users;
  }

  public sendAlertToSpecifyUser(user: IMUser, theme: IMThemes) {
    const userFinded = this.users.find((usr) => usr.username === user.username);
    if (userFinded) {
      this.themes.find((themeAux) => {
        if (themeAux.name !== theme.name) {
          return userFinded.want_recibe?.push(themeAux);
        }
      });
    }
    return userFinded;
  }

  public sendAlertToAllUsers(theme: IMThemes) {
    this.users.forEach((user) => {
      user.want_recibe?.push(theme);
      user.want_recibe?.map((userAlerts) => {
        if (userAlerts.name === theme.name) userAlerts.alerts.active = true;
      });
    });
  }

  public markAsRead(user: IMUser, theme: IMThemes) {
    const readTheme = user.want_recibe?.find(
      (tema) => tema.name === theme.name
    );

    if (readTheme) readTheme.alerts.read = true;
    return user;
  }
}
