import { parse, isAfter, isBefore } from "date-fns";
import IMThemes from "../../Models/IThemes";
import IMUser from "../../Models/IMUser";

export class UserService {
  private users: IMUser[] = [];
  private themes: IMThemes[] = [];

  constructor(users: IMUser[], themes: IMThemes[]) {
    this.users = users;
    this.themes = themes;
  }

  public register(user: IMUser) {
    this.users.push(user);
  }

  public setTopics(user: IMUser, theme: IMThemes) {
    this.themes.forEach((thm: IMThemes) => {
      if (thm.name === theme.name) {
        user.want_recibe?.push(thm);
      }
    });
  }

  public getExpiredUnreadAlertsForUser(user: IMUser): IMThemes[] {
    const currentDate = new Date();
    const expiredUrgentAlerts: IMThemes[] = [];
    const expiredInformativeAlerts: IMThemes[] = [];

    user.want_recibe?.forEach((theme) => {
      const alertDate = parse(
        theme.alerts.expiration_date || "",
        "dd/MM/yyyy",
        new Date()
      );

      if (isBefore(alertDate, currentDate) && theme.alerts.read !== true) {
        if (theme.alerts?.type === "Urgentes") {
          expiredUrgentAlerts.push(theme);
        } else if (theme.alerts?.type === "Informativas") {
          expiredInformativeAlerts.push(theme);
        }
      }
    });

    expiredUrgentAlerts.reverse();

    return [...expiredUrgentAlerts, ...expiredInformativeAlerts];
  }

  public getUnexpiredAlerts(user: IMUser): IMThemes[] {
    const currentDate = new Date();
    const urgentAlerts: IMThemes[] = [];
    const informativeAlerts: IMThemes[] = [];

    user.want_recibe?.forEach((theme) => {
      const alertDate = parse(
        theme.alerts.expiration_date || "",
        "dd/MM/yyyy",
        new Date()
      );

      if (isAfter(alertDate, currentDate)) {
        if (theme.alerts.type?.[0] === "Urgentes") {
          urgentAlerts.push(theme);
        } else if (theme.alerts.type?.[0] === "Informativas") {
          informativeAlerts.push(theme);
        }
      }
    });
    urgentAlerts.reverse();
    return [...urgentAlerts, ...informativeAlerts];
  }
}
