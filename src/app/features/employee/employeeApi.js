import { apiInstance } from "@/app/api";

const employeeApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/staff",
        method: "POST",
        body: data,
      }),
    }),
    updateEmployee: builder.mutation({
      query: (data) => ({
        url: `/staff`,
        method: "PUT",
        body: data,
      }),
    }),
    getEmployee: builder.query({
      query: (id) => ({
        url: `/staff/id?id=${id}`,
        method: "GET",
      }),
    }),
    getOfficeEmployees: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/staff/office?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
    }),
    getOfficeActiveEmployees: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/staff/active-by-office?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
    }),
    getDepartmentEmployees: builder.query({
      query: ({ tenantId, departmentId }) => ({
        url: `/staff/department?tenantId=${tenantId}&departmentId=${departmentId}`,
        method: "GET",
      }),
    }),
    getEmployeesOffices: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/staff/additional-offices?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
    }),
    updateStatusEmployee: builder.mutation({
      query: (data) => ({
        url: `/staff/update-active`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetEmployeeQuery,
  useGetOfficeEmployeesQuery,
  useGetOfficeActiveEmployeesQuery,
  useGetDepartmentEmployeesQuery,
  useGetEmployeesOfficesQuery,
  useUpdateStatusEmployeeMutation,
} = employeeApi;
