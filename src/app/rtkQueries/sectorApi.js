import { apiInstance } from "@/app/apiInstance";

const sectorApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createSector: builder.mutation({
      query: (data) => ({
        url: "/sector",
        method: "POST",
        body: data,
      }),
    }),
    updateSector: builder.mutation({
      query: (data) => ({
        url: `/sector`,
        method: "PUT",
        body: data,
      }),
    }),
    getSector: builder.query({
      query: (id) => ({
        url: `/sector?id=${id}`,
        method: "GET",
      }),
    }),
    getAllSector: builder.query({
      query: (tenantId) => ({
        url: `/sector/tenantId?tenantId=${tenantId}`,
        method: "GET",
      }),
    }),
    getActiveSector: builder.query({
      query: (tenantId) => ({
        url: `/sector/active-tenantId?tenantId=${tenantId}&active=Y`,
        method: "GET",
      }),
    }),
    updateStatusSector: builder.mutation({
      query: (data) => ({
        url: `/sector/active`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSectorMutation,
  useUpdateSectorMutation,
  useGetSectorQuery,
  useGetAllSectorQuery,
  useGetActiveSectorQuery,
  useUpdateStatusSectorMutation,
} = sectorApi;
