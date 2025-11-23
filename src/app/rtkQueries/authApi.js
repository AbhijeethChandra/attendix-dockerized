import { authApiInstance } from "@/app/apiInstance";

const authApi = authApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutAllApi: builder.mutation({
      query: ({ username }) => ({
        url: `/user/logout-all-devices?username=${username}`,
        method: "POST",
      }),
    }),
    logoutApi: builder.mutation({
      query: () => ({
        url: `/user/logout`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginApiMutation,
  useLogoutAllApiMutation,
  useLogoutApiMutation,
} = authApi;
