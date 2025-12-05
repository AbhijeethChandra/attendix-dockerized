import { apiInstance } from "@/app/apiInstance";

const officeApi = apiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createOffice: builder.mutation({
      query: (data) => ({
        url: "/office/save",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["office"],
    }),
    updateOffice: builder.mutation({
      query: (data) => ({
        url: `/office/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["office"],
    }),
    getOffice: builder.query({
      query: (id) => ({
        url: `/office/getById?id=${id}`,
        method: "GET",
      }),
      providesTags: ["office"],
    }),
    getAllOffice: builder.query({
      query: (tenantId) => ({
        url: `/office/getall?tenantId=${tenantId}`,
        method: "GET",
      }),
      providesTags: ["office"],
    }),
    getActiveOffices: builder.query({
      query: (tenantId) => ({
        url: `/office/getAllActive?tenantId=${tenantId}`,
        method: "GET",
      }),
      providesTags: ["office"],
    }),
    updateStatusOffice: builder.mutation({
      query: ({ id, active }) => ({
        url: `/office/update-active?id=${id}&active=${active}`,
        method: "PATCH",
      }),
      invalidatesTags: ["office"],
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
