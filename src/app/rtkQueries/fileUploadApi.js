import { apiInstance } from "@/app/apiInstance";

const attendancerequestApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    masterSave: builder.mutation({
      query: (file) => ({
        url: `/api/excel/attendance-master`,
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useMasterSaveMutation } = attendancerequestApi;
