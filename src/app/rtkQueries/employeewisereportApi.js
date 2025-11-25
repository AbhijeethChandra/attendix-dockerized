import { apiInstance } from "@/app/apiInstance";

const employeewisereportApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployeeWiseReport: builder.query({
      query: ({
        tenantId,
        officeId,
        fromDate,
        toDate,
        departmentId,
      }) => ({
        url: `/attendance/date`,
        params: {
          officeId,
          tenantId,
          fromDate,
          toDate,
          departmentId,
          staffId: 0,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllEmployeeWiseReportQuery } = employeewisereportApi;
