import { User } from "./items";

export type LoginRequest = {
  indexNum: string;
  password: string;
};
export type LoginResponse = {
  success: boolean;
  message?: string;
  data?: User;
};
