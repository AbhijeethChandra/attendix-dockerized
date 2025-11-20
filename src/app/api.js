import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL, BASE_AUTH_URL } from "../config";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import {
  handleLogoutSlice,
  handleRefreshToken,
} from "./features/auth/authSlice";

const handleApiError = (error, api) => {
  const status = error?.originalStatus || error.status;
  const errorMessage = error?.data?.message || "";
  console.log(error.data);
  // error.data = JSON.parse(error.data);
  let message =
    error?.data?.message ||
    error?.data?.errorCode ||
    "Request failed";
  if (status === 404) {
    return error;
  } else if (status === 401) {
    if (message === "Already Loggedin") {
      return;
    }
    if (message === "Unauthorized: Invalid JWT Token,") {
      api.dispatch(handleLogoutSlice());
      localStorage.clear();
    }
    message = "Unauthorized. Please login again";
  } else if (status >= 400)
    message =
      error?.data?.errorMessage || error.data.errorCode || "Request failed";
  else if (status === "FETCH_ERROR")
    message = "Network issue. Check connection.";
  toast.error(message);
};

const prepareHeaders = (headers, { getState }) => {
  const token = getState().auth?.accessToken;
  if (token) headers.set("authorization", `Bearer ${token}`);
  headers.set("requestId", uuidv4());
  return headers;
};
``;

const rawBaseQueryApi = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders,
});

const rawBaseQueryAuth = fetchBaseQuery({
  baseUrl: BASE_AUTH_URL,
  prepareHeaders,
});

//wrapper for Re authentication.
const reauthWrapper = (baseQuery) => async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);

  if (result.error?.status === 401) {
    const refreshToken = api.getState().auth?.refreshToken;

    const refreshResult = await rawBaseQueryAuth(
      {
        url: "/oauth/refresh",
        method: "PUT",
        body: { token: refreshToken },
      },
      api,
      extra
    );

    if (refreshResult.data?.accessToken) {
      api.dispatch(handleRefreshToken(refreshResult.data.accessToken));
      result = await baseQuery(args, api, extra);
    } else {
      api.dispatch(handleLogoutSlice());
    }
  }

  return result;
};

//wrapper for handling error
const errorWrapper = (baseQuery) => async (args, api, extra) => {
  const result = await baseQuery(args, api, extra);

  if (result.error) {
    handleApiError(result.error, api);
    return result;
  }

  const code = result?.data?.statusCode;
  if (code === 200 || code === 201) result.data.success = true;

  return result;
};

export const makeApiInstance = ({ reducerPath, baseQuery, tagTypes }) =>
  createApi({
    reducerPath,
    baseQuery,
    tagTypes,
    endpoints: () => ({}),
  });

// auth only error handling
export const authApiInstance = makeApiInstance({
  reducerPath: "authApi",
  baseQuery: errorWrapper(rawBaseQueryAuth),
  tagTypes: ["auth"],
});

// api uses reauth + error handling
export const apiInstance = makeApiInstance({
  reducerPath: "api",
  baseQuery: errorWrapper(reauthWrapper(rawBaseQueryApi)),
  tagTypes: ["dashboard"],
});
