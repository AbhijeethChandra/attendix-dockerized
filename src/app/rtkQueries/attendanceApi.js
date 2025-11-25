import { apiInstance } from "@/app/apiInstance";

const attendancerequestApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllattendanceRequest: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/punch-request/admin`,
        params: { officeId, tenantId },
        method: "GET",
      }),
    }),
    attendanceStatusUpdate: builder.mutation({
      query: ({ userId, action, requestId, remarks }) => ({
        url: `/punch-request/process/${requestId}?action=${action}&approverId=${userId}`,
        method: "PUT",
        body: { remarks },
      }),
    }),
  }),
});

export const {
  useGetAllattendanceRequestQuery,
  useAttendanceStatusUpdateMutation,
} = attendancerequestApi;
