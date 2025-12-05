import { apiInstance } from "@/app/apiInstance";

const roleApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createWeekend: builder.mutation({
      query: (data) => ({
        url: `/weekend/save`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["weekend"],
    }),
    updateWeekend: builder.mutation({
      query: (data) => ({
        url: `/weekend/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["weekend"],
    }),
    getWeekendByShift: builder.query({
      query: ({ officeId, shiftId }) => ({
        url: `/weekend/get-by-shift?officeId=${officeId}&shiftId=${shiftId}`,
        method: "GET",
      }),
      providesTags: ["weekend"],
    }),
  }),
});

export const {
  useCreateWeekendMutation,
  useUpdateWeekendMutation,
  useGetWeekendByShiftQuery,
} = roleApi;
