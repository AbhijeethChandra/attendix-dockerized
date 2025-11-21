import { apiInstance } from "@/app/api";

const designationApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createDesignation: builder.mutation({
      query: (data) => ({
        url: "/designations",
        method: "POST",
        body: data,
      }),
    }),
    updateDesignation: builder.mutation({
      query: (data) => ({
        url: `/designations`,
        method: "PUT",
        body: data,
      }),
    }),
    getDesignation: builder.query({
      query: (id) => ({
        url: `/designations/${id}`,
        method: "GET",
      }),
    }),
    getAllDesignations: builder.query({
      query: (tenantId) => ({
        url: `/designations/tenant?tenantId=${tenantId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useGetDesignationQuery,
  useGetAllDesignationsQuery,
} = designationApi;
