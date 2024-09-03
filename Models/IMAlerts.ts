export interface IMAlerts {
  id?: number;
  active?: boolean;
  type?: "Informativas" | "Urgentes";
  read?: boolean;
  expiration_date?: string;
  expiration_hour?: string;
}
