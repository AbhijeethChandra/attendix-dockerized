import { apiInstance } from "@/app/apiInstance";

const daywisereportApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllDayWiseReport: builder.query({
      query: ({ tenantId, officeId, fromDate, toDate, departmentId }) => ({
        url: `/attendance/day-wise-report`,
        params: {
          officeId,
          tenantId,
          fromDate,
          toDate,
          departmentId,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllDayWiseReportQuery } = daywisereportApi;
