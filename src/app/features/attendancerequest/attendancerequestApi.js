import { apiInstance } from "@/app/api";

const attendancerequestApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllattendanceRequest: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/punch-request/admin?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllattendanceRequestQuery } = attendancerequestApi;
