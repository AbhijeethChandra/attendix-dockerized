import { apiInstance } from "@/app/apiInstance";

const officeApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: "/country/get-all-country-active",
        method: "GET",
      }),
    }),
    getStates: builder.query({
      query: () => ({
        url: `/state/get-all-state-active`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCountriesQuery, useGetStatesQuery } = officeApi;
