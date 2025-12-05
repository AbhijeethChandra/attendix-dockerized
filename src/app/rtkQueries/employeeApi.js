import { apiInstance } from "@/app/apiInstance";

const employeeApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employee"]
    }),
    updateEmployee: builder.mutation({
      query: (data) => ({
        url: `/staff`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["employee"]
    }),
    getEmployee: builder.query({
      query: (id) => ({
        url: `/staff/id?id=${id}`,
        method: "GET",
      }),
      providesTags: ["employee"]
    }),
    getOfficeEmployees: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/staff/office?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
      providesTags: ["employee"]
    }),
    getOfficeReportingManagers: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/staff/office-v1?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
      providesTags: ["employee"]
    }),
    getOfficeActiveEmployees: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/staff/active-by-office?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
      providesTags: ["employee"]
    }),
    getDepartmentEmployees: builder.query({
      query: ({ tenantId, departmentId }) => ({
        url: `/staff/department?tenantId=${tenantId}&departmentId=${departmentId}`,
        method: "GET",
      }),
      providesTags: ["employee"]
    }),
    getEmployeesOffices: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/staff/additional-offices?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
      providesTags: ["employee"]
    }),
    updateStatusEmployee: builder.mutation({
      query: (data) => ({
        url: `/staff/update-active`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["employee"]
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
  useGetOfficeReportingManagersQuery,
  useGetEmployeesOfficesQuery,
  useUpdateStatusEmployeeMutation,
} = employeeApi;
