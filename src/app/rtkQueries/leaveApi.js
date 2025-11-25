import { apiInstance } from "@/app/apiInstance";

const leaveApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeaveRequest: builder.query({
      query: ({ tenantId }) => ({
        url: `/leave-request/tenant/${tenantId}`,
        method: "GET",
      }),
    }),
    leaveRequestStatusUpdate: builder.mutation({
      query: ({ userId, action, requestId, remarks }) => ({
        url: `/leave-request/${requestId}/process`,
        method: "PUT",
        params: {
          status: action,
          decisionReason: remarks,
          approverId: userId,
        },
      }),
    }),
    leaveDayviseReport: builder.query({
      query: ({ tenantId, officeId, fromDate, toDate }) => ({
        url: `/leave-request/day-wise-report`,
        params: {
          tenantId,
          officeId,
          fromDate,
          toDate,
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllLeaveRequestQuery,
  useLeaveRequestStatusUpdateMutation,
  useLeaveDayviseReportQuery,
} = leaveApi;
