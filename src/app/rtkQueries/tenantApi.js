import { apiInstance } from "@/app/apiInstance";

const tenantApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createTenant: builder.mutation({
      query: (data) => ({
        url: "/tenant/save-tenant",
        method: "POST",
        body: data,
      }),
    }),
    updateTenant: builder.mutation({
      query: (data) => ({
        url: `/tenant/update-tenant`,
        method: "PUT",
        body: data,
      }),
    }),
    getTenant: builder.query({
      query: (id) => ({
        url: `/tenant/get-tenant-by-id`,
        params: { id },
        method: "GET",
      }),
    }),
    getAllTenant: builder.query({
      query: () => ({
        url: `/tenant/all-tenant`,
        method: "GET",
      }),
    }),
    getActiveTenant: builder.query({
      query: (tenantId) => ({
        url: `/attendix/office/getAllActive`,
        params: { tenantId },
        method: "GET",
      }),
    }),
    updateStatusTenant: builder.mutation({
      query: (data) => ({
        url: `/tenant/update-tenant-active`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useGetTenantQuery,
  useGetAllTenantQuery,
  useGetActiveTenantQuery,
  useUpdateStatusTenantMutation,
} = tenantApi;
