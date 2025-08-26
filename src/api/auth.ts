import { User } from "@/types/items";
import apiService from ".";
import type { LoginRequest } from "@/types/auth";

export class AuthAPIService {
  static async login(request: LoginRequest): Promise<User> {
    const response = await apiService.POST<User>("/login", request);
    return response;
  }

  static async logout() {
    await apiService.POST("/logout", null);
  }
}
