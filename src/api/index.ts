/* eslint-disable no-extend-native */
import { HttpError } from "@/types/errors";
import { EStudentAPIError, ServerResponse } from "@/types/items";
import { format } from "date-fns";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTimeLocalRegex =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):\d{2}\.\d+Z$/;

const BASE_URL = import.meta.env.VITE_ESTUDENT_API_BASE_URL;

function getAuthToken(path: string): string | undefined {
  return sessionStorage?.user
    ? JSON.parse(sessionStorage?.user)?.token
    : undefined;
}

async function GET<T>(
  path: string,
  headers: Record<string, string> = { "Content-Type": "application/json" }
): Promise<T> {
  const token = getAuthToken(path);
  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  const finalHeaders = {
    ...authHeaders,
    ...headers,
  };
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: finalHeaders,
    });

    return await handleResponse(response);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    else throw new Error(`GET request failed: ${(error as Error).message}`);
  }
}

export async function POST<T>(
  path: string,
  payload: unknown,
  headers: Record<string, string> = {}
): Promise<T> {
  try {
    const token = getAuthToken(path);
    const isFormData = payload instanceof FormData;

    const authHeaders: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const finalHeaders = {
      ...authHeaders,
      ...headers,
      ...(!isFormData && !headers["Content-Type"]
        ? { "Content-Type": "application/json" }
        : {}),
    };
    const finalURL = `${BASE_URL}${path}`;

    const response = await fetch(finalURL, {
      method: "POST",
      headers: finalHeaders,
      body: isFormData ? (payload as FormData) : JSON.stringify(payload),
    });

    return await handleResponse(response);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    else throw new Error(`Post request failed: ${(error as Error).message}`);
  }
}

export async function PUT<T>(
  path: string,
  payload: unknown,
  headers: Record<string, string> = {}
): Promise<T> {
  try {
    const token = getAuthToken(path);
    const isFormData = payload instanceof FormData;

    const authHeaders: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const finalHeaders = {
      ...authHeaders,
      ...headers,
      ...(!isFormData && !headers["Content-Type"]
        ? { "Content-Type": "application/json" }
        : {}),
    };

    const response = await fetch(`${BASE_URL}${path}`, {
      method: "PUT",
      headers: finalHeaders,
      body: isFormData ? (payload as FormData) : JSON.stringify(payload),
    });

    return await handleResponse(response);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    else throw new Error(`PUT request failed: ${(error as Error).message}`);
  }
}
export async function DELETE<T>(
  path: string,
  headers: Record<string, string> = { "Content-Type": "application/json" }
): Promise<T> {
  const token = getAuthToken(path);
  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  const finalHeaders = {
    ...authHeaders,
    ...headers,
  };
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers: finalHeaders,
    });
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    else throw new Error(`DELETE request failed: ${(error as Error).message}`);
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    let errorMessage = "";
    try {
      const errorBody: EStudentAPIError = await response.json();
      errorMessage = errorBody.message ?? "Unknown error occurred on server";
    } catch (error) {
      console.error(error);
      errorMessage = await response.text();
    } finally {
      throw new HttpError(errorMessage, response.status);
    }
  }

  if (response.status === 204) {
    const serverResponse: ServerResponse = {
      success: true,
      statusCode: 204,
    };
    return serverResponse;
  }
  const serverResponse: ServerResponse =
    (await response.json()) as ServerResponse;
  serverResponse.statusCode = response.status;
  return parseDates(serverResponse.data);
}
function parseLocalDateTime(str: string): Date | null {
  // Match ISO string like "2025-06-20T10:00" or "2025-06-20T10:00:00.123"
  const match = isoDateTimeLocalRegex.exec(str);
  if (!match) return null;

  const [, year, month, day, hour, minute] = match;
  // Create Date in local timezone without offset adjustment
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    0, // zero seconds
    0 // zero ms
  );
}

export function parseDates<T>(obj: T): T {
  if (typeof obj === "string") {
    const localDate = parseLocalDateTime(obj);
    if (localDate) return localDate as unknown as T;

    if (dateRegex.test(obj)) {
      // Just date without time - safe to parse normally
      return new Date(obj) as unknown as T;
    }
  } else if (Array.isArray(obj)) {
    return obj.map(parseDates) as unknown as T;
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, parseDates(value)])
    ) as unknown as T;
  }
  return obj;
}
Date.prototype.toJSON = function () {
  const hasTime =
    this.getHours() > 0 || this.getMinutes() > 0 || this.getSeconds() > 0;
  if (hasTime) {
    // LocalDateTime format
    return format(this, "yyyy-MM-dd'T'HH:mm:ss.SSS");
  } else {
    // LocalDate format
    return format(this, "yyyy-MM-dd");
  }
};

const apiService = { GET, POST, PUT, DELETE };
export default apiService;
