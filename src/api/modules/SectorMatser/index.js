import { Client } from "../../client";



export const listSectorMaster = async () => {
  try {
    const response = await Client.get("/asset/sector/tenantId?tenantId=1"); 
    return response; 
  } catch (error) {
    console.error("Failed to fetch vendor types:", error.message);
    throw error; 
  }
};

export const saveSectorMaster = async (formValues) => {
  console.log('formvalues', formValues)
    try {
      let response = await Client.post("/asset/sector",formValues);
      console.log("response",response)
      return response;
    } catch (error) {
      return error;
    }
  };


  
    export const getSectorMasterById = async (id) => {
      try {
        const response = await Client.get(`/asset/sector/id?id=${id}`);
        return response; 
      } catch (error) {
        console.error("Failed to fetch vendor types:", error.message);
        throw error; 
      }
    };
  
    export const updateSectorMaster = async (formValues) => {
      console.log('formValues', formValues)
      try {
        const response = await Client.put(`/asset/sector`,formValues);
        return response;
      } catch (error) {
        throw error;
      }
    };
    
    export const updateSectorMasterStatus = async (formValues) => {
      try {
        let response = await Client.put((`/asset/sector/active`), formValues);
        return response;
      } catch (error) {
        return error;
      }
    };