import axios, { AxiosResponse, AxiosError } from "axios";
import { handleError } from "./handleError";

/**
 * Reusable HTTP GET function.
 * @param url - The URL to send the GET request to.
 * @param params - Optional query parameters to include in the request.
 * @returns A Promise that resolves with the response data or rejects with an error.
 */
export async function getRequest<T>(
  api: string,
  params?: Record<string, any>
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get(api, { params });
    return response.data;
  } catch (error: any) {
    // handleError(new Error("Error in getRequest function"));
    console.log(error);
    throw new Error(`Error from getRequest function for ${api}`);
  }

  return {} as T;
}
