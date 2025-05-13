import { Client } from "../../client";



export const listVendorMaster= async () => {
  try {
    const response = await Client.get("/asset/vendormaster"); 
    return response; 
  } catch (error) {
    console.error("Failed to fetch vendor types:", error.message);
    throw error; 
  }
};

export const saveVendorMaster = async (formValues) => {
    try {
      let response = await Client.post("/asset/vendormaster", formValues);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const getVendorMasterById = async (id) => {
    try {
      const response = await Client.get(`/asset/vendormaster/${id}`);
      return response; 
    } catch (error) {
      console.error("Failed to fetch vendor types:", error.message);
      throw error; 
    }
  };

  export const updateVendorMaster= async (id,formValues) => {
    try {
      let response = await Client.put((`/asset/vendormaster/${id}`), formValues);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const updateVendorMasterStatus = async (formValues) => {
    try {
      let response = await Client.put((`/asset/vendormaster/active`), formValues);
      return response;
    } catch (error) {
      return error;
    }
  };


  export const listCountry= async () => {
    try {
      const response = await Client.get("/asset/country/get-all-country-active"); 
      return response; 
    } catch (error) {
      console.error("Failed to fetch vendor types:", error.message);
      throw error; 
    }
  };

  export const listStateById= async (id) => {
    try {
      const response = await Client.get(`/asset/state/get-state-by-country?country=${id}`); 
      return response; 
    } catch (error) {
      console.error("Failed to fetch vendor types:", error.message);
      throw error; 
    }
  };

  export const listDistrictById= async (id) => {
    try {
      const response = await Client.get(`/asset/district/get-district-by-state?state=${id}`); 
      return response; 
    } catch (error) {
      console.error("Failed to fetch vendor types:", error.message);
      throw error; 
    }
  };

  export const listCityById= async (id) => {
    try {
      const response = await Client.get(`/asset/city/get-city-by-district?district=${id}`); 
      return response; 
    } catch (error) {
      console.error("Failed to fetch vendor types:", error.message);
      throw error; 
    }
  };

