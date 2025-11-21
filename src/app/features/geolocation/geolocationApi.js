import { apiInstance } from "@/app/api";

const geolocationApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createGeolocation: builder.mutation({
      query: (data) => ({
        url: "/office-geo-location",
        method: "POST",
        body: data,
      }),
    }),
    updateGeolocation: builder.mutation({
      query: (data) => ({
        url: `/office-geo-location`,
        method: "PUT",
        body: data,
      }),
    }),
    getGeolocation: builder.query({
      query: (id) => ({
        url: `/office-geo-location/${id}`,
        method: "GET",
      }),
    }),
    getAllGeolocations: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/office-geo-location?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateGeolocationMutation,
  useUpdateGeolocationMutation,
  useGetGeolocationQuery,
  useGetAllGeolocationsQuery,
} = geolocationApi;
