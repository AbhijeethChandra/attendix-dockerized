import { apiInstance } from "@/app/apiInstance";

const deviceinfoApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllDeviceInfo: builder.query({
      query: (data) => ({
        url: `/device-info/fetch/43/0/0`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllDeviceInfoQuery } = deviceinfoApi;
