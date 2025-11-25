import { apiInstance } from "@/app/apiInstance";

const leavereportApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeaveReport: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/leave-request/day-wise-report?tenantId=${tenantId}&officeId=${officeId}&fromDate=2025-11-24&toDate=2025-11-24`,

        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllLeaveReportQuery } = leavereportApi;
