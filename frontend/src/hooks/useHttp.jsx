import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, { ...config, credentials: "include" });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message ||
        resData.error ||
        "Something went wrong, failed to send request."
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData = null) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(bodyData = null, overrideConfig = {}) {
      setIsLoading(true);
      setError(null);

      try {
        const isFormData = bodyData instanceof FormData;

        const finalConfig = {
          ...config,
          ...overrideConfig,
          body: isFormData || !bodyData ? bodyData : JSON.stringify(bodyData),
          headers: isFormData
            ? { ...config.headers, ...overrideConfig.headers }
            : {
                "Content-Type": "application/json",
                ...config.headers,
                ...overrideConfig.headers,
              },
        };

        if (isFormData && finalConfig.headers) {
          delete finalConfig.headers["Content-Type"];
        }

        const resData = await sendHttpRequest(
          overrideConfig.url || url,
          finalConfig
        );
        setData(resData);
        return resData;
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
