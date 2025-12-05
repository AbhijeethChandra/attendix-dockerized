import { apiInstance } from "@/app/apiInstance";

const rolemasterApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rolemaster"],
    }),
    updateRole: builder.mutation({
      query: (data) => ({
        url: `/roles`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["rolemaster"],
    }),
    getAllRoles: builder.query({
      query: (tenantId) => ({
        url: `/roles/list-by-tenant?tenantId=${tenantId}`,
        method: "GET",
      }),
      providesTags: ["rolemaster"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useGetAllRolesQuery,
} = rolemasterApi;
