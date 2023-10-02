import { useState } from "react";

interface ApiHookResult<T> {
  data: T | null | undefined | String;
  error: Error | null | String;
  loading: boolean;
  callApi: () => Promise<void>;
}
interface ApiHookParams<T> {
  apiFunction: () => Promise<T>;
  isAuthorize?: boolean;
}

export function useApi<T>({
  apiFunction,
  isAuthorize,
}: ApiHookParams<T>): ApiHookResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = isAuthorize ? true : false;
      const result = await apiFunction();
      setData(result);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, callApi };
}
