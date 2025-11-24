import { apiInstance } from "@/app/api";

const leaverequestApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeaveRequest: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/leave-request/admin?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllLeaveRequestQuery } = leaverequestApi;
