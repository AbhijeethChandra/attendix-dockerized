import { apiInstance } from "@/api/apiInstance";

const dashboardApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: () => ({
        url: "/dashboard/admin",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminDashboardQuery } = dashboardApi;
