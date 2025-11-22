import { apiInstance } from "@/app/api";

const roleApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (tenantId) => ({
        url: `/roles/list-by-tenant?tenantId=${tenantId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRolesQuery } = roleApi;
