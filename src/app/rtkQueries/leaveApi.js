import { apiInstance } from "@/app/apiInstance";

const leaveApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createLeave: builder.mutation({
      query: (data) => ({
        url: "/leave",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leave"],
    }),
    updateLeave: builder.mutation({
      query: (data) => ({
        url: `/leave`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["leave"],
    }),
    getLeave: builder.query({
      query: (id) => ({
        url: `/leave/id?id=${id}`,
        method: "GET",
      }),
      providesTags: ["leave"],
    }),
    getOfficeLeave: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/leave/office?officeId=${officeId}&tenantId=${tenantId}`,
        method: "GET",
      }),
      providesTags: ["leave"],
    }),
    getOfficeActiveLeave: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/leave/office-active?officeId=${officeId}&tenantId=${tenantId}`,
        method: "GET",
      }),
      providesTags: ["leave"],
    }),
    updateStatusLeave: builder.mutation({
      query: (data) => ({
        url: `/leave/update-active`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["leave"],
    }),
  }),
});

export const {
  useCreateLeaveMutation,
  useUpdateLeaveMutation,
  useGetLeaveQuery,
  useGetOfficeLeaveQuery,
  useGetOfficeActiveLeaveQuery,
  useUpdateStatusLeaveMutation,
} = leaveApi;
