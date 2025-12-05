import { apiInstance } from "@/app/apiInstance";

const departmentApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (data) => ({
        url: "/departments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["department"]
    }),
    updateDepartment: builder.mutation({
      query: (data) => ({
        url: `/departments`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["department"]
    }),
    getDepartment: builder.query({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "GET",
      }),
      providesTags: ["department"]
    }),
    getAllDepartment: builder.query({
      query: (tenantId) => ({
        url: `/departments/tenant/${tenantId}`,
        method: "GET",
      }),
      providesTags: ["department"]
    }),
    getActiveDepartments: builder.query({
      query: (tenantId) => ({
        url: `/departments/active/${tenantId}`,
        method: "GET",
      }),
      providesTags: ["department"]
    }),
    updateStatusDepartment: builder.mutation({
      query: (data) => ({
        url: `/departments/update-active`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["department"]
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetDepartmentQuery,
  useGetAllDepartmentQuery,
  useGetActiveDepartmentsQuery,
  useUpdateStatusDepartmentMutation,
} = departmentApi;
