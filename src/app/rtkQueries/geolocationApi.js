import { apiInstance } from "@/app/apiInstance";

const geolocationApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createGeolocation: builder.mutation({
      query: (data) => ({
        url: "/office-geo-location",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["geolocation"],
    }),
    updateGeolocation: builder.mutation({
      query: (data) => ({
        url: `/office-geo-location`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["geolocation"],
    }),
    getGeolocation: builder.query({
      query: (id) => ({
        url: `/office-geo-location/${id}`,
        method: "GET",
      }),
      providesTags: ["geolocation"],
    }),
    getAllGeolocations: builder.query({
      query: ({ tenantId, officeId }) => ({
        url: `/office-geo-location?tenantId=${tenantId}&officeId=${officeId}`,
        method: "GET",
      }),
      providesTags: ["geolocation"],
    }),
  }),
});

export const {
  useCreateGeolocationMutation,
  useUpdateGeolocationMutation,
  useGetGeolocationQuery,
  useGetAllGeolocationsQuery,
} = geolocationApi;
