import axios, { AxiosResponse, AxiosError } from "axios";

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
    // Handle the error if the request failed
    if (axios.isAxiosError(error)) {
      // AxiosError includes detailed error information
      const axiosError: AxiosError = error;
      console.error("HTTP GET request failed:", axiosError.message);
      // You can also access response status and headers from axiosError.response

      // Rethrow the error to let the caller handle it
      throw axiosError;
    } else {
      // Handle non-Axios errors (e.g., network issues)
      console.error("An error occurred:", error.message);

      // Rethrow the error to let the caller handle it
      throw error;
    }
  }
}
