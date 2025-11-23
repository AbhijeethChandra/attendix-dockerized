import { apiInstance } from "@/app/apiInstance";

const officeApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createOffice: builder.mutation({
      query: (data) => ({
        url: "/office/save",
        method: "POST",
        body: data,
      }),
    }),
    updateOffice: builder.mutation({
      query: (data) => ({
        url: `/office/update`,
        method: "PUT",
        body: data,
      }),
    }),
    getOffice: builder.query({
      query: (id) => ({
        url: `/office/getById?id=${id}`,
        method: "GET",
      }),
    }),
    getAllOffice: builder.query({
      query: (tenantId) => ({
        url: `/office/getall?tenantId=${tenantId}`,
        method: "GET",
      }),
    }),
    getActiveOffices: builder.query({
      query: (tenantId) => ({
        url: `/office/getAllActive?tenantId=${tenantId}`,
        method: "GET",
      }),
    }),
    updateStatusOffice: builder.mutation({
      query: ({ id, active }) => ({
        url: `/office/update-active?id=${id}&active=${active}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateOfficeMutation,
  useUpdateOfficeMutation,
  useGetOfficeQuery,
  useGetAllOfficeQuery,
  useGetActiveOfficesQuery,
  useUpdateStatusOfficeMutation,
} = officeApi;
