import { Client } from "../../client";

export const listTenants = async () => {
  try {
    const response = await Client.get("asset/tenant/all-tenant");
    return response;
  } catch (error) {
    console.error("Failed to fetch tenants:", error.message);
    throw error;
  }
};

export const saveTenant = async (formValues) => {
  try {
    let response = await Client.post("asset/tenant/save-tenant", formValues);
    return response;
  } catch (error) {
    return error;
  }
};

export const getTenantById = async (id) => {
  try {
    const response = await Client.get(`asset/tenant/get-tenant-by-id?id=${id}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch tenant:", error.message);
    throw error;
  }
};

export const updateTenant = async (id, formValues) => {
  try {
    // Include the id in the formValues object
    const payload = {
      ...formValues,
      id: id
    };
    let response = await Client.put(`asset/tenant/update-tenant`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateTenantStatus = async (formValues) => {
  try {
    let response = await Client.put(`asset/tenant/update-tenant-active`, formValues);
    return response;
  } catch (error) {
    return error;
  }
};