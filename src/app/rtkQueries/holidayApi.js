import { apiInstance } from "@/app/apiInstance";

const holidayApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createHoliday: builder.mutation({
      query: (data) => ({
        url: "/holiday/bulk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["holiday"],
    }),
    updateHoliday: builder.mutation({
      query: (data) => ({
        url: `/holiday`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["holiday"],
    }),
    getHoliday: builder.query({
      query: (id) => ({
        url: `/holiday/${id}`,
        method: "GET",
      }),
      providesTags: ["holiday"],
    }),
    getAllHoliday: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/holiday?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
      providesTags: ["holiday"],
    }),
  }),
});

export const {
  useCreateHolidayMutation,
  useUpdateHolidayMutation,
  useGetHolidayQuery,
  useGetAllHolidayQuery,
} = holidayApi;
