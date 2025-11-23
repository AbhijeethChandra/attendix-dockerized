import { apiInstance } from "@/app/apiInstance";

const shiftOverrideApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createShiftOverride: builder.mutation({
      query: (data) => ({
        url: "/shift-overrides",
        method: "POST",
        body: data,
      }),
    }),
    updateShiftOverride: builder.mutation({
      query: (data) => ({
        url: `/shift-overrides`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllShiftOverride: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/shift-overrides/find-all?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateShiftOverrideMutation,
  useUpdateShiftOverrideMutation,
  useGetAllShiftOverrideQuery,
} = shiftOverrideApi;
