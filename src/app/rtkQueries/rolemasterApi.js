import { apiInstance } from "@/app/apiInstance";

const rolemasterApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body: data,
      }),
    }),
    updateRole: builder.mutation({
      query: (data) => ({
        url: `/roles`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllRoles: builder.query({
      query: (tenantId) => ({
        url: `/roles/list-by-tenant?tenantId=${tenantId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useGetAllRolesQuery,
} = rolemasterApi;
