import { IMAlerts } from "./IMAlerts";

export default interface IMThemes {
  id?: number;
  name: string;
  type: string;
  alerts: IMAlerts;
}
