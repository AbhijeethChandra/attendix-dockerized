import { apiInstance } from "@/app/apiInstance";

const shiftOverrideApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createShiftOverride: builder.mutation({
      query: (data) => ({
        url: "/shift-overrides",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["shiftOverride"],
    }),
    updateShiftOverride: builder.mutation({
      query: (data) => ({
        url: `/shift-overrides`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["shiftOverride"],
    }),
    getAllShiftOverride: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/shift-overrides/find-all?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
      providesTags: ["shiftOverride"],
    }),
  }),
});

export const {
  useCreateShiftOverrideMutation,
  useUpdateShiftOverrideMutation,
  useGetAllShiftOverrideQuery,
} = shiftOverrideApi;
