import { apiInstance } from "@/app/apiInstance";

const deviceinfoApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getAllDeviceInfo: builder.query({
      query: ({tenantId, officeId}) => ({
        url: `/device-info/fetch/${tenantId}/${officeId}/0`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllDeviceInfoQuery } = deviceinfoApi;
