/* eslint-disable no-extend-native */
import { NoContentError } from "@/errors/NoContentError";
import { EStudentApiError } from "@/types/items";
import { format } from "date-fns";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTimeLocalRegex =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):\d{2}\.\d+Z$/;

const BASE_URL = process.env.REACT_APP_ESTUDENT_API_BASE_URL;

function getAuthToken(path: string): string | null {
  return JSON.parse(sessionStorage.user).token;
}

// export async function POST<T>(
//   path: string,
//   payload: unknown,
//   headers: Record<string, string> = {}
// ): Promise<T> {
//   try {
//     const token = getAuthToken(path);
//     const isFormData = payload instanceof FormData;

//     const authHeaders: Record<string, string> = token
//       ? { Authorization: `Bearer ${token}` }
//       : {};

//     const finalHeaders = {
//       ...authHeaders,
//       ...headers,
//       ...(!isFormData && !headers["Content-Type"]
//         ? { "Content-Type": "application/json" }
//         : {}),
//     };

//     const response = await fetch(`${BASE_URL}${path}`, {
//       method: "POST",
//       headers: finalHeaders,
//       body: isFormData ? (payload as FormData) : JSON.stringify(payload),
//     });

//     return await handleResponse(response);
//   } catch (error) {
//     throw new Error(`${(error as Error).message}`);
//   }
// }

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
    if (error instanceof NoContentError) throw error;
    throw new Error(`GET request failed: ${(error as Error).message}`);
  }
}

// export async function PUT<T>(
//   path: string,
//   payload: unknown,
//   headers: Record<string, string> = {}
// ): Promise<T> {
//   try {
//     const token = getAuthToken(path);
//     const isFormData = payload instanceof FormData;

//     const authHeaders: Record<string, string> = token
//       ? { Authorization: `Bearer ${token}` }
//       : {};

//     const finalHeaders = {
//       ...authHeaders,
//       ...headers,
//       ...(!isFormData && !headers["Content-Type"]
//         ? { "Content-Type": "application/json" }
//         : {}),
//     };

//     const response = await fetch(`${BASE_URL}${path}`, {
//       method: "PUT",
//       headers: finalHeaders,
//       body: isFormData ? (payload as FormData) : JSON.stringify(payload),
//     });

//     return await handleResponse(response);
//   } catch (error) {
//     throw new Error(`PUT request failed: ${(error as Error).message}`);
//   }
// }
async function handleResponse(response: Response) {
  if (response.status === 204) throw new NoContentError();

  if (response.headers.get("Content-Disposition") !== null) return response;
  else return response.json().then(parseDates);
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
const apiService = { GET };
export default apiService;
