import { apiInstance } from "@/app/apiInstance";

const designationApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createDesignation: builder.mutation({
      query: (data) => ({
        url: "/designations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["designation"],
    }),
    updateDesignation: builder.mutation({
      query: (data) => ({
        url: `/designations`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["designation"],
    }),
    getDesignation: builder.query({
      query: (id) => ({
        url: `/designations/${id}`,
        method: "GET",
      }),
      providesTags: ["designation"],
    }),
    getAllDesignations: builder.query({
      query: (tenantId) => ({
        url: `/designations/tenant?tenantId=${tenantId}`,
        method: "GET",
      }),
      providesTags: ["designation"],
    }),
    getAllDesignationsByDepartment: builder.query({
      query: ({departmentId, tenantId}) => ({
        url: `/designations/active`,
        params: { departmentId, tenantId },
        method: "GET",
      }),
      providesTags: ["designation"],
    }),
    updateStatusDesignation: builder.mutation({
      query: ({ id, active }) => ({
        url: `/designations/update-active?id=${id}&active=${active}`,
        method: "PUT",
      }),
      invalidatesTags: ["designation"],
    }),
  }),
});

export const {
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useGetDesignationQuery,
  useGetAllDesignationsQuery,
  useGetAllDesignationsByDepartmentQuery,
  useUpdateStatusDesignationMutation,
} = designationApi;
