import { apiInstance } from "@/app/apiInstance";

const holidayApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createHoliday: builder.mutation({
      query: (data) => ({
        url: "/holiday/bulk",
        method: "POST",
        body: data,
      }),
    }),
    updateHoliday: builder.mutation({
      query: (data) => ({
        url: `/holiday`,
        method: "PUT",
        body: data,
      }),
    }),
    getHoliday: builder.query({
      query: (id) => ({
        url: `/holiday/${id}`,
        method: "GET",
      }),
    }),
    getAllHoliday: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/holiday?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateHolidayMutation,
  useUpdateHolidayMutation,
  useGetHolidayQuery,
  useGetAllHolidayQuery,
} = holidayApi;
