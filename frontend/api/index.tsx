import axios, { AxiosResponse } from "axios";

interface ApiRequestOptions {
  url: string;
  method?: "GET" | "DELETE" | "POST" | "PUT" | "PATCH";
  data?: any | undefined;
  token?: string | undefined;
}

export interface ApiResponse {
  status: boolean;
  message?: string | undefined;
  data?: any;
}

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  responseType: "json",
});

export const apiRequest = async ({
  url,
  method = "GET",
  data,
  token,
}: ApiRequestOptions): Promise<ApiResponse> => {
  try {
    const options: any = {
      method: method,
      headers: {
        "content-type": "application/json",
      },
    };
    if (data) options["data"] = data;
    if (token) options["headers"]["Authorization"] = `Bearer ${token}`;

    const response: AxiosResponse = await Api(url, options);

    return {
      data: response.data,
      status: true,
    };
  } catch (err: any) {
    return {
      status: err?.success,
      message: err?.message,
    };
  }
};
