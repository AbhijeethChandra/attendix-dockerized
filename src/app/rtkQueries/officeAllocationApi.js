import { apiInstance } from "@/app/apiInstance";

const officeAllocationApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createOfficeAllocation: builder.mutation({
      query: (data) => ({
        url: "/user-domain",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateOfficeAllocationMutation } = officeAllocationApi;
