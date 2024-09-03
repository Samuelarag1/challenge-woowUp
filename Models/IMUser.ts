import IMThemes from "./IThemes";

export default interface IMUsers {
  id?: number;
  username: string;
  notifications?: boolean;
  want_recibe: IMThemes[];
}
