import { apiInstance } from "@/app/api";

const departmentApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (data) => ({
        url: "/departments",
        method: "POST",
        body: data,
      }),
    }),
    updateDepartment: builder.mutation({
      query: (data) => ({
        url: `/departments`,
        method: "PUT",
        body: data,
      }),
    }),
    getDepartment: builder.query({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "GET",
      }),
    }),
    getAllDepartment: builder.query({
      query: (tenantId) => ({
        url: `/departments/tenant/${tenantId}`,
        method: "GET",
      }),
    }),
    updateStatusDepartment: builder.mutation({
      query: (data) => ({
        url: `/departments/update-active`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetDepartmentQuery,
  useGetAllDepartmentQuery,
  useUpdateStatusDepartmentMutation,
} = departmentApi;
