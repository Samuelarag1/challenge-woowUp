import { ThemeService } from ".././themeServices";
import IMUsers from "../../../Models/IMUser";
import IMThemes from "../../../Models/IThemes";

describe("Pruebas unitarias para ThemeService", () => {
  let themeService: ThemeService;
  const user: IMUsers = {
    username: "user1",
    want_recibe: [],
  };
  const theme: IMThemes = {
    name: "Theme1",
    type: "Type1",
    alerts: {
      read: false,
    },
  };

  beforeEach(() => {
    themeService = new ThemeService([user], [theme]);
  });

  it("Agregar nuevo tema al array", () => {
    const newTheme: IMThemes = {
      name: "Theme2",
      type: "Type2",
      alerts: {
        read: false,
      },
    };
    themeService.setTheme(newTheme);

    expect((themeService as any).themes).toContainEqual(newTheme);
  });

  it("Debe retornar el tema correcto con la propiedad read = true", () => {
    const themeWithAlert: IMThemes = {
      name: "Theme1",
      type: "Type1",
      alerts: {
        read: false,
      },
    };
    const result = themeService.alertReaded(user, themeWithAlert);

    expect(result).toContainEqual(themeWithAlert);
  });
});
