import IMThemes from "../../Models/IThemes";
import IMUser from "../../Models/IMUser";

export class ThemeService {
  private users: IMUser[] = [];
  private themes: IMThemes[] = [];

  constructor(users: IMUser[], themes: IMThemes[]) {
    this.users = users;
    this.themes = themes;
  }

  public setTheme(theme: IMThemes) {
    this.themes.push(theme);
  }

  public alertReaded(user: IMUser, theme: IMThemes) {
    const alertTheme = this.themes?.filter(
      (themeAux) => themeAux.name === theme.name
    );

    if (alertTheme) {
      for (let i = 0; i < this.users.length; i++) {
        this.users[i].want_recibe?.map((theme) => {
          if (
            theme.name === alertTheme[0].name &&
            this.users[i].username === user.username
          ) {
            alertTheme[0].alerts.read = true;
          }
        });
      }
    }
    return alertTheme;
  }
}
