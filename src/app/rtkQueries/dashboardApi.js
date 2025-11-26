import { apiInstance } from "@/app/apiInstance";
import dayjs from "dayjs";

const dashboardApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getOffices: builder.query({
      query: (tenantId) => ({
        url: `/office/getAllActive?tenantId=${tenantId}`,
        method: "GET",
      }),
    }),
    getDashboardCounts: builder.query({
      query: ({ tenantId, officeId }) => {
        return {
          url: `/dashboard/summary`,
          params: {
            tenantId: tenantId,
            officeId: officeId || undefined,
            date: dayjs().format("YYYY-MM-DD"),
          },
          method: "GET",
        };
      },
    }),
    getDashboardCountsForAll: builder.query({
      query: (tenantId) => ({
        url: `/dashboard/tenant`,
        params: { tenantId, date: dayjs().format("YYYY-MM-DD") },
        method: "GET",
      }),
    }),
    getUnreadNotifications: builder.query({
      query: (staffId) => ({
        url: `/notification/get-unread?staffId=${staffId}`,
        method: "GET",
      }),
    }),
    updateNotificationReadStatus: builder.mutation({
      query: ({ notificationId }) => ({
        url: `/notification/update-read-status`,
        params: { notificationId },
        method: "PUT",
      }),
    }),
    updateAllNotificationsReadStatus: builder.mutation({
      query: ({ staffId }) => ({
        url: `/notification/update-all-status`,
        params: { staffId },
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetOfficesQuery,
  useGetDashboardCountsQuery,
  useGetDashboardCountsForAllQuery,
  useGetUnreadNotificationsQuery,
  useUpdateNotificationReadStatusMutation,
  useUpdateAllNotificationsReadStatusMutation,
} = dashboardApi;
