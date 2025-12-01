import { apiInstance } from "@/app/apiInstance";

const leaveApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createShiftAssign: builder.mutation({
      query: (data) => ({
        url: "/employee-shift/save",
        method: "POST",
        body: data,
      }),
    }),
    updateShiftAssign: builder.mutation({
      query: (data) => ({
        url: `/employee-shift/update`,
        method: "PUT",
        body: data,
      }),
    }),
    getShiftAssignByDate: builder.query({
      query: ({ tenantId, staffId, officeId, fromDate, toDate }) => ({
        url: `/employee-shift/by-date?tenantId=${tenantId}&officeId=${officeId}&staffId=${staffId}&fromDate=${fromDate}&toDate=${toDate}`,
        method: "GET",
      }),
    }),
    getShiftAssign: builder.query({
      query: ({ tenantId, officeId, shiftId }) => ({
        url: `/employee-shift/get-by-tenant-office`,
        params: { officeId, tenantId },
        method: "GET",
      }),
    }),
    getShiftAssignByStaff: builder.query({
      query: ({ tenantId, staffId, officeId }) => ({
        url: `/employee-shift/staff/${staffId}?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateShiftAssignMutation,
  useUpdateShiftAssignMutation,
  useGetShiftAssignByDateQuery,
  useGetShiftAssignQuery,
  useGetShiftAssignByStaffQuery,
} = leaveApi;
