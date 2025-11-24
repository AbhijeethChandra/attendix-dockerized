import { apiInstance } from "@/app/api";

const daywisereportApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllDayWiseReport: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/attendance/day-wise-report?tenantId=${tenantId}&officeId=${officeId}&fromDate=2025-08-01&toDate=2025-08-01&departmentId=0`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllDayWiseReportQuery } = daywisereportApi;
