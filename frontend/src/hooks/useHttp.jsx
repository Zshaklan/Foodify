import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, { ...config, credentials: "include" });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
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

  // const sendRequest = useCallback(
  //   async function sendRequest(bodyData) {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const finalConfig = {
  //         ...config,
  //         body:
  //           bodyData && !(bodyData instanceof FormData)
  //             ? JSON.stringify(bodyData)
  //             : bodyData,
  //         headers: {
  //           "Content-Type":
  //             bodyData instanceof FormData ? undefined : "application/json",
  //           ...config.headers,
  //         },
  //       };

  //       const resData = await sendHttpRequest(url, finalConfig);
  //       console.log(resData);
  //       setData(resData);
  //       return resData;
  //     } catch (err) {
  //       setError(err.message || "Something went wrong!");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [url, config]
  // );

  const sendRequest = useCallback(
    async function sendRequest(bodyData) {
      setIsLoading(true);
      setError(null);

      try {
        const isFormData = bodyData instanceof FormData;

        const finalConfig = {
          ...config,
          body: isFormData || !bodyData ? bodyData : JSON.stringify(bodyData),
          headers: isFormData
            ? { ...config.headers } // Don't set Content-Type for FormData
            : {
                "Content-Type": "application/json",
                ...config.headers,
              },
        };

        // Remove Content-Type header for FormData (let browser set it with boundary)
        if (isFormData && finalConfig.headers) {
          delete finalConfig.headers["Content-Type"];
        }

        const resData = await sendHttpRequest(url, finalConfig);
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
