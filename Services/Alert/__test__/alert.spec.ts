import IMUser from "../../../Models/IMUser";
import IMThemes from "../../../Models/IThemes";
import { AlertService } from "./../alertServices";

describe("AlertService", () => {
  let service: AlertService;
  let user: IMUser;
  let theme: IMThemes;
  let otherTheme: IMThemes;

  beforeEach(() => {
    user = {
      username: "testuser",
      want_recibe: [],
    };

    theme = {
      name: "Test Theme",
      type: "info",
      alerts: {
        id: 1,
        active: false,
        type: "Informativas",
        read: false,
        expiration_date: "2024-12-31",
        expiration_hour: "23:59",
      },
    };

    otherTheme = {
      name: "Other Theme",
      type: "info",
      alerts: {
        id: 2,
        active: false,
        type: "Informativas",
        read: false,
        expiration_date: "2024-12-31",
        expiration_hour: "23:59",
      },
    };

    service = new AlertService([user], [theme, otherTheme]);
  });

  test("Debe enviar una alerta a un usuario especifico", () => {
    const result = service.sendAlertToSpecifyUser(user, theme);

    expect(result).toBeDefined();
    expect(result?.want_recibe).toBeDefined();
    expect(result?.want_recibe).toHaveLength(1);
    expect(result?.want_recibe[0].name).toBe(otherTheme.name);
  });

  test("Debe activar las alertas a todos los usuarios", () => {
    service.sendAlertToAllUsers(theme);

    expect(user.want_recibe).toBeDefined();
    expect(user.want_recibe).toHaveLength(1);
    expect(user.want_recibe[0].name).toBe(theme.name);
    expect(user.want_recibe[0].alerts.active).toBe(true);
  });

  test("Debe marcar alerta como leida", () => {
    user.want_recibe?.push(theme);

    const result = service.markAsRead(user, theme);

    expect(result).toBeDefined();
    expect(result?.want_recibe).toBeDefined();
    const readTheme = result?.want_recibe?.find(
      (tema) => tema.name === theme.name
    );
    expect(readTheme).toBeDefined();
    expect(readTheme?.alerts.read).toBe(true);
  });
});
