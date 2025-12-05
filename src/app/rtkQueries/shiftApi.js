import { apiInstance } from "@/app/apiInstance";

const shiftApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createShift: builder.mutation({
      query: (data) => ({
        url: "/shift-master",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["shift"],
    }),
    updateShift: builder.mutation({
      query: (data) => ({
        url: `/shift-master/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["shift"],
    }),
    getShift: builder.query({
      query: (id) => ({
        url: `/shift-master?id=${id}`,
        method: "GET",
      }),
      providesTags: ["shift"],
    }),
    getAllOfficeShifts: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/shift-master/getall-by-office?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
      providesTags: ["shift"],
    }),
    getAllOfficeActiveShifts: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/shift-master/getall-by-office-active?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
      providesTags: ["shift"],
    }),
    updateStatusShift: builder.mutation({
      query: (data) => ({
        url: `/shift-master/update-active`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["shift"],
    }),
  }),
});

export const {
  useCreateShiftMutation,
  useUpdateShiftMutation,
  useGetShiftQuery,
  useGetAllOfficeShiftsQuery,
  useGetAllOfficeActiveShiftsQuery,
  useUpdateStatusShiftMutation,
} = shiftApi;
