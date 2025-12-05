import { apiInstance } from "@/app/apiInstance";

const sectorApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createSector: builder.mutation({
      query: (data) => ({
        url: "/sector",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sector"],
    }),
    updateSector: builder.mutation({
      query: (data) => ({
        url: `/sector`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["sector"],
    }),
    getSector: builder.query({
      query: (id) => ({
        url: `/sector?id=${id}`,
        method: "GET",
      }),
      providesTags: ["sector"],
    }),
    getAllSector: builder.query({
      query: (tenantId) => ({
        url: `/sector/tenantId?tenantId=${tenantId}`,
        method: "GET",
      }),
      providesTags: ["sector"],
    }),
    getActiveSector: builder.query({
      query: (tenantId) => ({
        url: `/sector/active-tenantId?tenantId=${tenantId}&active=Y`,
        method: "GET",
      }),
      providesTags: ["sector"],
    }),
    updateStatusSector: builder.mutation({
      query: (data) => ({
        url: `/sector/active`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["sector"],
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
