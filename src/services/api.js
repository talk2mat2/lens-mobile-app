import axios from "axios";
import React from "react";
import { useQuery, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { AsyncGetItem } from "../components/Helpers";
import { logOut } from "../redux/reducers/usersSlice";
// import getEnvVars from "./env";
// import https from "https"

// const baseUrl = getEnvVars().apiUrl;
// export const baseUrl= "http://www.cserver.somee.com/api/v1";
export const baseUrl = "https://www.cartoraapp.lat/api/v1";
// export const baseUrl= "http://192.168.43.139:5274/api/v1";
// axios.defaults.httpAgent=new https.Agent({
//   rejectUnauthorized:false
// })
const rootApi = (hash, header) => {
  return axios.create({
    baseURL: baseUrl,
    // timeout: 10000,
    headers: {
      Accept: "application/json",
      Authorization: `token ${hash}`,
      "content-type": header || "application/json",
      appVersion: "1.1.5",
    },
  });
};

export const useClientQuery = (key) => {
  const { data, isError, isLoading, refetch, error } = useQuery(
    key,
    async () => {
      const hash = (await AsyncGetItem("token")) || "";
      return rootApi(hash, null)
        .get("/" + key)
        .then((res) => res.data)
        .catch((err) => {
          console.log("query error=", err);
          console.log(err?.response);
          err.response.data.statusCode = err?.response?.status;
          throw err?.response?.data;
        });
    }
  );
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  React.useEffect(() => {
    if (isError) {
      console.log(error?.statusCode, "response");
      if (error?.statusCode == "401") {
        alert("Login required");
        setTimeout(handleLogout, 3000);
      }
      // Handle mutation errors here
    }
  }, [isError, error]);
  return { data, isError, isLoading, refetch };
};

// export const useClientMutation = (key, datas = {}, method) => {
//   const { data, isError, isLoading, mutate } = useMutation(key, async () => {
//     const hash = (await AsyncGetItem("token")) || "";
//     return rootApi()
//       [method](key, datas)
//       .then((res) =>res.data).catch(err=>{throw res.data});
//   });

//   return { data, isError, isLoading, mutate };
// };

export const useMutations = () => {
  const mutateFunction = async ({ key, method, data = {} }) => {
    const hash = (await AsyncGetItem("token")) || "";
    console.log("mutate normal caled", key);
    return rootApi(hash, null)
      [method?.toLowerCase()](`/${key}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("error=", err);
        console.log("an err", err?.response);
        err.response.data.statusCode = err.response?.status;
        throw err?.response?.data;
      });
  };
  const {
    mutate: reactQueryMuate,
    isError,
    error,
    isLoading,
  } = useMutation(mutateFunction);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  React.useEffect(() => {
    if (isError) {
      console.log(error?.statusCode, "response");
      if (error?.statusCode == "401") {
        alert("Login required");
        setTimeout(handleLogout, 3000);
      }
      // Handle mutation errors here
    }
  }, [isError, error]);

  const mutate = (
    { key, method, data },
    { onSuccess = () => {}, onError = () => {}, onSettled = () => {} }
  ) => {
    reactQueryMuate(
      { key, method, data },
      {
        onError,
        onSettled,
        onSuccess,
      }
    );
  };
  return { mutate, isLoading };
};

export const useUploadMutations = () => {
  const mutateFunction = async ({ key, method, data = {} }) => {
    console.log("mutate uplocaled");
    const hash = (await AsyncGetItem("token")) || "";
    // return rootApi(hash, "multipart/form-data")
    //   [method?.toLowerCase()](`/${key}`, data)
    //   .then((res) => res.data)
    //   .catch((err) => {
    //     console.log("error=", err);
    //     throw err?.response?.data;
    //   });

    return axios
      .post(baseUrl + "/" + key, data, {
        headers: {
          Accept: "application/json",
          Authorization: `token ${hash}`,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        err.response.data.statusCode = err.response?.status;
        throw err?.response.data;
      });
  };
  const {
    mutate: reactQueryMuate,
    isError,
    error,
    isLoading,
  } = useMutation(mutateFunction);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };
  React.useEffect(() => {
    if (isError) {
      if (error?.statusCode == "401") {
        alert("Login required");
        setTimeout(handleLogout, 3000);
      }
      // Handle mutation errors here
    }
  }, [isError, error]);
  const mutate = (
    { key, method, data },
    { onSuccess = () => {}, onError = () => {}, onSettled = () => {} }
  ) => {
    reactQueryMuate(
      { key, method, data },
      {
        onError,
        onSettled,
        onSuccess,
      }
    );
  };
  return { mutate, isLoading };
};

export const forceQuery = async (key, method, data = null) => {
  const hash = (await AsyncGetItem("token")) || "";
  return rootApi(hash, null)
    [method?.toLowerCase()](`/${key}`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.log("error=", err);
      err.response.data.statusCode = err.response?.status;
      throw err?.response?.data;
    });
};
