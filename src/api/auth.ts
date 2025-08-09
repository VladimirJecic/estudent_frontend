import { User } from "@/types/items";
import apiService from ".";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export class AuthAPIService {
  static async login(request: LoginRequest): Promise<User> {
    const response: LoginResponse = await apiService.POST<LoginResponse>(
      "/login",
      request
    );
    return response.data!;
  }

  static async logout() {
    await apiService.POST("/logout", null);
  }
}
