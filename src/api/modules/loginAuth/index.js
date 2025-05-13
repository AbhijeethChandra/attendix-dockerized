import { Client } from "../../client";

export const userLogin = async (formValues) => {
  try {
    let response = await Client.post("/asset-oauth/user/login", formValues);
    return response;
  } catch (error) {
    return error;
  }
};

export const userLogout = async () => {
  try {
    let response = await Client.get("/asset-oauth/user/logout");
    return response;
  } catch (error) {
    return error;
  }
};
