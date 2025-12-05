import { apiInstance } from "@/app/apiInstance";

const tenantApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createTenant: builder.mutation({
      query: (data) => ({
        url: "/tenant/save-tenant",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tenant"],
    }),
    updateTenant: builder.mutation({
      query: (data) => ({
        url: `/tenant/update-tenant`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tenant"],
    }),
    getTenant: builder.query({
      query: (id) => ({
        url: `/tenant/get-tenant-by-id`,
        params: { id },
        method: "GET",
      }),
      providesTags: ["tenant"],
    }),
    getAllTenant: builder.query({
      query: () => ({
        url: `/tenant/all-tenant`,
        method: "GET",
      }),
      providesTags: ["tenant"],
    }),
    getActiveTenant: builder.query({
      query: (tenantId) => ({
        url: `/attendix/office/getAllActive`,
        params: { tenantId },
        method: "GET",
      }),
      providesTags: ["tenant"],
    }),
    updateStatusTenant: builder.mutation({
      query: (data) => ({
        url: `/tenant/update-tenant-active`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tenant"],
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
