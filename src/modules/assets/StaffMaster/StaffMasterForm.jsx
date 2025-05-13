import React, { useState, useEffect } from "react";
import { Grid, Button, Box, IconButton } from "@mui/material";
import CustomInput from "../../../components/common/CommonInput";
import {
  listCityById,
  listDistrictById,
  listStateById,
  listCountry,
  saveVendorMaster,
  updateVendorMaster,
} from "../../../api/modules/VendorMaster/index";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { useConfirmation } from "../../../context/ConfirmationContext";

const StaffMasterForm = ({ onCancel, editData, isEditMode, tableData }) => {
  const [formData, setFormData] = useState({
    role: "",
    staffName: "",
    staffId: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
  });

  const confirm = useConfirmation();

  const [vendorTypeList, setVendorTypeList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([vendorTypeData(), countryListData()]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (isEditMode && editData) {
      console.log("editData received in VendorMasterForm:", editData);

      setFormData({
        vendorType: editData.vendorTypeId ? String(editData.vendorTypeId) : "",
        vendorName: editData.vendorName || "",
        contactPerson: editData.contactPerson || "",
        phone: editData.phone || "",
        email: editData.email || "",
        addressLine1: editData.address || "",
        country: editData.countryId ? String(editData.countryId) : "",
        state: editData.stateId ? String(editData.stateId) : "",
        district: editData.districtId ? String(editData.districtId) : "",
        city: editData.cityId ? String(editData.cityId) : "",
        pincode: editData.pincode || "",
      });

      const loadLocationData = async () => {
        if (editData.countryId) {
          await stateListData(editData.countryId);

          if (editData.stateId) {
            await districtListData(editData.stateId);

            if (editData.districtId) {
              await cityListData(editData.districtId);
            }
          }
        }
      };

      loadLocationData();
    }
  }, [isEditMode, editData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      role: "",
      staffName: "",
      staffId: "",
      phone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      country: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
    });
  };

//   const vendorTypeData = async () => {
//     try {
//       const res = await listVendorType();
//       if (res.data.success) {
//         const formattedData = res.data.data.map((item) => ({
//           id: item.id,
//           vendor: item.vendorName,
//         }));
//         setVendorTypeList(formattedData);
//       } else {
//         console.error(res.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching vendor types:", error);
//     }
//   };

  const countryListData = async () => {
    try {
      const res = await listCountry();
      if (res.data.success) {
        const formattedData = res.data.data.map((item) => ({
          id: item.id,
          country: item.country,
        }));
        setCountryList(formattedData);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const stateListData = async (countryId) => {
    try {
      const res = await listStateById(countryId);
      if (res.data.success) {
        const formattedData = res.data.data.map((item) => ({
          id: item.id,
          state: item.statename,
        }));
        setStateList(formattedData);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const districtListData = async (stateId) => {
    try {
      const res = await listDistrictById(stateId);
      if (res.data.success) {
        const formattedData = res.data.data.map((item) => ({
          id: item.id,
          district: item.districtname,
        }));
        setDistrictList(formattedData);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const cityListData = async (districtId) => {
    try {
      const res = await listCityById(districtId);
      if (res.data.success) {
        const formattedData = res.data.data.map((item) => ({
          id: item.id,
          city: item.cityname,
        }));
        setCityList(formattedData);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSave = async () => {
    try {
      const confirmed = await confirm({
        title: "Are you sure to save the details...?",
        confirmText: "YES",
        cancelText: "NO",
      });

      if (!confirmed) {
        return;
      }

      const payload = {
        vendorTypeId: formData.vendorType || 0,
        vendorName: formData.vendorName,
        contactPerson: formData.contactPerson,
        phno: formData.phone,
        email: formData.email,
        address: formData.addressLine1,
        countryId: formData.country,
        stateId: formData.state,
        districtId: formData.district,
        cityId: formData.city,
        pincode: formData.pincode,
        active: isEditMode ? editData.active : "Y",
        officeId: 1,
        tenantId: 1,
      };

      if (isEditMode) {
        payload.id = editData.id;
      }

      let response;
      if (isEditMode) {
        response = await updateVendorMaster(editData.id, payload);
      } else {
        response = await saveVendorMaster(payload);
      }

      if (response?.status === 200 || response?.status === 201) {
        tableData();
        onCancel();
        toast.success(response.data.message || "Successfully added!");
      } else {
        console.error("Failed to save vendor:", response);
        toast.error(response.data.message || "failed to update");
      }
    } catch (error) {
      console.error("Error saving vendor:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (formData.country) {
      stateListData(formData.country);
    } else {
      setStateList([]);
      setDistrictList([]);
      setCityList([]);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      districtListData(formData.state);
    } else {
      setDistrictList([]);
      setCityList([]);
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.district) {
      cityListData(formData.district);
    } else {
      setCityList([]);
    }
  }, [formData.district]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="p-2 gap-2">
      <div className="flex items-center justify-between mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <span>Attandance /</span>
          <span className="font-semibold">Staff Master</span>
        </div>
        <IconButton onClick={onCancel} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>

      <Box display="flex" flexDirection="column">
        <Grid container spacing={2} maxWidth="1000px" marginTop={"20px"}>
          <Grid item xs={12} md={4}>
            <CustomInput
              label="Staff Name"
              placeholder="Enter Staff Name"
              required
              name="staffName"
              value={formData.staffName}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomInput
              label="Staff Id"
              placeholder="Enter Staff Id"
              required
              name="staffId"
              value={formData.staffId}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomInput
              label="Role"
              placeholder="Select Role"
              required
              options={vendorTypeList.map((item) => ({
                label: item.vendor,
                value: String(item.id),
              }))}
              name="role"
              value={formData.role}
              handleChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomInput
              label="Address Line 1"
              placeholder="Enter Address 1"
              name="addressLine1"
              value={formData.addressLine1}
              handleChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomInput
              label="Address Line 2"
              placeholder="Enter Address 2"
              name="addressLine2"
              value={formData.addressLine2}
              handleChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomInput
              label="Country"
              placeholder="Select Country"
              options={countryList.map((item) => ({
                label: item.country,
                value: String(item.id),
              }))}
              name="country"
              value={formData.country}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="State"
              placeholder="Select State"
              options={stateList.map((item) => ({
                label: item.state,
                value: String(item.id),
              }))}
              name="state"
              value={formData.state}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="District"
              placeholder="Select District"
              options={districtList.map((item) => ({
                label: item.district,
                value: String(item.id),
              }))}
              name="district"
              value={formData.district}
              handleChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomInput
              label="City"
              placeholder="Enter City"
              name="city"
              value={formData.city}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Pincode"
              placeholder="Enter Pincode"
              name="pincode"
              value={formData.pincode}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Phone"
              placeholder="Enter Phone"
              required
              name="phone"
              value={formData.phone}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Email"
              placeholder="Enter Email"
              required
              name="email"
              value={formData.email}
              handleChange={handleChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            mt={4}
            className="flex justify-between gap-4 w-full"
          >
            <Button
              type="button"
              onClick={handleClear}
              className="h-[40px] w-[165px] ROUNDED !border !border-[var(--primary-clr)] !text-[var(--primary-clr)] font-medium !rounded-[var(--border-radius)]"
            >
              Clear
            </Button>

            <Button
              type="submit"
              className="h-[40px] w-[165px] ROUNDED font-medium !rounded-[var(--border-radius)] !bg-[var(--primary-clr)] !text-[#FFF] hover:opacity-90 transition"
              //   onClick={handleSave}
            >
              {isEditMode ? "Update" : "Save"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StaffMasterForm;
