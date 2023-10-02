import { apiRequest } from ".";

export const login = (data: any) =>
  apiRequest({ url: "login", method: "POST", data });

export const register = (data: any) =>
  apiRequest({ url: "register", method: "POST", data });
