import React, { useState, useEffect } from "react";
import { Grid, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "../../../components/common/CommonInput";
import { saveTenant, updateTenant } from "../../../api/modules/TenantMaster";
import toast from "react-hot-toast";
import { useConfirmation } from "../../../context/ConfirmationContext";

const TenantForm = ({ onCancel, editData, isEditMode, tableTenantData }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [errors, setErrors] = useState({
    contactPhone: "",
    name: "",
  });

  // Validate phone number
  const validatePhoneNumber = (phone) => {
    // Remove any non-digit characters
    const cleanedPhone = phone.replace(/\D/g, '');
    
    // Check if phone number contains only digits
    if (/\D/.test(phone)) {
      return "Phone number should contain only digits";
    }
    
    // Check length
    if (cleanedPhone.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    
    // Check if all zeros
    if (/^0+$/.test(cleanedPhone)) {
      return "Phone number cannot be all zeros";
    }
    
    return ""; // No error
  };

  // Validate tenant name (allow only letters, numbers, and spaces)
  const validateTenantName = (name) => {
    // Check if name contains only letters, numbers, and spaces
    if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
      return "Only letters, numbers, and spaces are allowed";
    }
    
    // Optional: Additional checks like minimum length
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    
    return ""; // No error
  };

  const isSaveDisabled =
    !formData.name || 
    !formData.contactEmail || 
    !formData.contactPhone ||
    !!errors.contactPhone ||
    !!errors.name;

  const confirm = useConfirmation();

  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        name: editData.name || "",
        contactEmail: editData.contactEmail || "",
        contactPhone: editData.contactPhone || "",
      });
    }
  }, [isEditMode, editData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    // Special handling for phone number
    if (name === "contactPhone") {
      // Remove non-digit characters
      const numericValue = value.replace(/\D/g, '');
      
      // Limit to 10 digits
      const limitedValue = numericValue.slice(0, 10);
      
      // Validate phone number
      const phoneError = validatePhoneNumber(limitedValue);
      
      setErrors(prev => ({
        ...prev,
        contactPhone: phoneError
      }));
      
      setFormData((prev) => ({
        ...prev,
        [name]: limitedValue,
      }));
    } else if (name === "name") {
      // Remove special characters from name
      const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
      
      // Validate tenant name
      const nameError = validateTenantName(sanitizedValue);
      
      setErrors(prev => ({
        ...prev,
        name: nameError
      }));
      
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      contactEmail: "",
      contactPhone: "",
    });
    setErrors({
      contactPhone: "",
      name: "",
    });
  };

  const handleSave = async () => {
    // Perform final validation before saving
    const phoneError = validatePhoneNumber(formData.contactPhone);
    const nameError = validateTenantName(formData.name);
    
    if (phoneError || nameError) {
      setErrors(prev => ({
        ...prev,
        contactPhone: phoneError,
        name: nameError
      }));
      return;
    }

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
        tenantName: formData.name,
        email: formData.contactEmail,
        phone: formData.contactPhone,
        active: isEditMode ? editData.active : "Y",
      };

      let response;
      if (isEditMode) {
        response = await updateTenant(editData.id, payload);
      } else {
        response = await saveTenant(payload);
      }

      if (response?.status === 200 || response?.status === 201) {
        tableTenantData();
        onCancel();
        toast.success(response.data.message || "Successfully added!");
      } else {
        console.error("Failed to save tenant:", response);
        toast.error(response.data.message || "failed to update");
      }
    } catch (error) {
      console.error("Error saving tenant:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Box className="p-2 gap-2">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <span>Attendance /</span>
          <span className="font-semibold">Tenant Master</span>
        </div>
        <IconButton onClick={onCancel} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Form */}
      <Box display="flex" flexDirection="column" paddingTop={"20px"}>
        <Grid container spacing={2} maxWidth="1000px">
          {/* Row 1 */}
          <Grid item>
            <CustomInput
              label="Tenant Name"
              placeholder="Enter Tenant Name"
              required
              value={formData.name}
              name="name"
              handleChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item>
            <CustomInput
              label="Contact Email"
              placeholder="Enter Contact Email"
              type="email"
              required
              name="contactEmail"
              handleChange={handleChange}
              value={formData.contactEmail}
            />
          </Grid>
          <Grid item>
            <CustomInput
              label="Contact Phone"
              placeholder="Enter Contact Phone Number"
              required
              name="contactPhone"
              handleChange={handleChange}
              value={formData.contactPhone}
              error={!!errors.contactPhone}
              helperText={errors.contactPhone}
              inputProps={{
                maxLength: 10,
              }}
            />
          </Grid>

          {/* Save and Cancel Buttons */}
          <Grid
            item
            xs={12}
            mt={4}
            className="flex justify-between w-full gap-4"
          >
            <Button
              type="button"
              onClick={handleClear}
              className="h-[40px] w-[165px] ROUNDED !border !border-[var(--primary-clr)] !text-[var(--primary-clr)] font-medium !rounded-[var(--border-radius)]"
            >
              Clear
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaveDisabled}
              className={`
                h-[40px] w-[165px] rounded font-medium !rounded-[var(--border-radius)] !bg-[var(--primary-clr)] !text-[#FFF] hover:opacity-90 transition
                ${isSaveDisabled ? "opacity-50 cursor-not-allowed bg-gray-400" : ""}
              `}
            >
              {isEditMode ? "Update" : "Save"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TenantForm;