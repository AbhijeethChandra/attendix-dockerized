import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL, BASE_AUTH_URL } from "../config";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { handleLogoutSlice, handleRefreshToken } from "./slice/authSlice";

const handleApiError = (error, api) => {
  const status = error?.originalStatus || error.status;

  let message =
    error?.data?.message || error?.data?.errorCode || "Request failed";
  if (status === 404) {
    return error;
  } else if (status === 401) {
    if (message.includes("Invalid JWT Token")) {
      api.dispatch(handleLogoutSlice());
      localStorage.clear();
      message = "Unauthorized. Please login again";
    }
    if (error?.data?.data) {
      message = error?.data?.data;
    }
  } else if (status === "FETCH_ERROR")
    message = "Network issue. Check connection.";
  toast.dismiss();
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

// Wrapper to trim all string values in the request body
const trimStringsWrapper = (baseQuery) => async (args, api, extra) => {
  // Function to recursively trim strings in objects/arrays
  const trimStrings = (obj) => {
    if (typeof obj === "string") {
      return obj.trim();
    }
    if (Array.isArray(obj)) {
      return obj.map(trimStrings);
    }
    if (obj !== null && typeof obj === "object") {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key] = trimStrings(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  };

  // Handle FormData separately
  const trimFormData = (formData) => {
    const newFormData = new FormData();

    for (const [key, value] of formData.entries()) {
      // Only trim if it's a string, keep Files/Blobs as-is
      if (typeof value === "string") {
        newFormData.append(key, value.trim());
      } else {
        newFormData.append(key, value);
      }
    }

    return newFormData;
  };

  // Transform the request body if it exists
  if (args.body) {
    if (args.body instanceof FormData) {
      args = {
        ...args,
        body: trimFormData(args.body),
      };
    } else {
      args = {
        ...args,
        body: trimStrings(args.body),
      };
    }
  }

  return baseQuery(args, api, extra);
};

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

  const status = result?.data?.status || result?.error?.status;
  if (status === 208) {
    let message =
      result?.data?.data ||
      result?.data?.message ||
      "Request already processed";
    if (Array.isArray(result?.data?.data)) {
      message = result?.data?.data.join(", ") || "Request already processed";
    }
    handleApiError({ status: 208, data: { message } }, api);
    return { error: { status: 208, data: { message } } };
  }
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
  baseQuery: errorWrapper(trimStringsWrapper(rawBaseQueryApi)),
  tagTypes: [
    "dashboard",
    "weekend",
    "shift",
    "office",
    "role",
    "staff",
    "shiftOverride",
    "attendance",
    "report",
    "holiday",
    "leave",
  ],
});
