import { UserService } from "./../userServices";
import IMThemes from "../../../Models/IThemes";
import IMUser from "../../../Models/IMUser";
import { parse, isAfter } from "date-fns";

describe("AlertService", () => {
  let service: UserService;
  let user: IMUser;
  let theme: IMThemes;
  let expiredTheme: IMThemes;
  let unexpiredTheme: IMThemes;

  beforeEach(() => {
    user = {
      username: "testuser",
      want_recibe: [],
    };

    theme = {
      name: "Test Theme",
      type: "Informativas",
      alerts: {
        id: 1,
        active: true,
        type: "Informativas",
        read: false,
        expiration_date: "31/12/2024",
        expiration_hour: "23:59",
      },
    };

    expiredTheme = {
      name: "Expired Theme",
      type: "Urgentes",
      alerts: {
        id: 2,
        active: true,
        type: "Urgentes",
        read: false,
        expiration_date: "01/01/2023",
        expiration_hour: "23:59",
      },
    };

    unexpiredTheme = {
      name: "Unexpired Theme",
      type: "Informativas",
      alerts: {
        id: 3,
        active: true,
        type: "Informativas",
        read: false,
        expiration_date: "01/01/2025",
        expiration_hour: "23:59",
      },
    };

    service = new UserService([user], [theme, expiredTheme, unexpiredTheme]);
  });

  test("Debe registrar un usuario", () => {
    const newUser: IMUser = { username: "newuser", want_recibe: [] };
    service.register(newUser);

    expect(service["users"]).toContain(newUser);
  });

  test("Debe agregar un tema al usuario", () => {
    service.setTopics(user, theme);

    if (user.want_recibe && user.want_recibe.length > 0) {
      expect(user.want_recibe[0].name).toBe(theme.name);
    } else {
      fail("Se esperaba en want_recibe un tema");
    }
  });

  test("Debe retornar las alertas expiradas sin leer", () => {
    user.want_recibe?.push(expiredTheme, unexpiredTheme);

    const result = service.getExpiredUnreadAlertsForUser(user);

    if (result && result.length > 0) {
      expect(result[0].name).toBe(expiredTheme.name);
      expect(result[0].alerts.read).toBe(false);
    } else {
      fail("Se esperaba la respuesta de una alerta expirada.");
    }
  });

  test("Debe retornar las alertas no expiradas", () => {
    user.want_recibe?.push(expiredTheme, unexpiredTheme);

    const result = service.getUnexpiredAlerts(user);

    if (result && result.length > 0) {
      expect(result[0].name).toBe(unexpiredTheme.name);
      expect(
        isAfter(
          parse(
            result[0].alerts.expiration_date || "",
            "dd/MM/yyyy",
            new Date()
          ),
          new Date()
        )
      ).toBe(true);
    } else {
      fail("Se esperaba aunque sea una alerta sin expirar");
    }
  });
});
