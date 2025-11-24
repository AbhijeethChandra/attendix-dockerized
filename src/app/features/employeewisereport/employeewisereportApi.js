import { apiInstance } from "@/app/api";

const employeewisereportApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployeeWiseReport: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/attendance/date?tenantId=${tenantId}&officeId=${officeId}&fromDate=2025-11-22&toDate=2025-11-22&staffId=0&departmentId=0`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllEmployeeWiseReportQuery } = employeewisereportApi;
