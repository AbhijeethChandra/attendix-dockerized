import { Client } from "../../client"


  export const getTableData=async()=>{
    try {
        const resp=await Client.get(`/asset/office/getall?tenantId=1`)
        // console.log("resp",resp)
        return resp
    } catch (error) {
        console.error("error",error)
    }
     
   }



 export const postFormData=async(body)=>{
    try {
        const resp=await Client.post(`/asset/office/save`,body)
        return resp
    } catch (error) {
        console.error(error)
    }
      
  }

    export const getParentOffice=async()=>{
        try {
          const resp=await Client.get(`/asset/office/getAllActive?tenantId=1`)
         return resp
        } catch (error) {
          
        }
    }

    export const putUpdate=async(data)=>{
        try {
          const resp=await Client.put(`/asset/office/update`,data)
              return resp
        } catch (error) {
          console.log(error)
        }
    }


    export const getbyId=async(id)=>{
      try {
        const resp=await Client.get(`asset/office/getById?Id=${id}`)
       return resp
      } catch (error) {
        
      }
  }

   
   export const updateStatus=async(id,status)=>{
       try {
        const resp=await Client.patch(`/asset/office/update-active?id=${id}&active=${status}`)
        return resp
       } catch (error) {
        console.log("error")
       }
   }
     

   export const getSector=async(id)=>{
       try {
        const resp=await Client.get(`/asset/sector/tenantId?tenantId=${id}`)
        return resp
       } catch (error) {
        console.error(error)
       }
   }
    