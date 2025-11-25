import { apiInstance } from "@/app/apiInstance";

const deviceinfoApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllDeviceInfo: builder.query({
      query: ({tenantId}) => ({
        url: `/device-info/fetch/${tenantId}/0/0`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllDeviceInfoQuery } = deviceinfoApi;
