import React, { useState, useEffect } from "react";
import { Grid, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "../../../components/common/CommonInput";
import toast from "react-hot-toast";
import { useConfirmation } from "../../../context/ConfirmationContext";

import {
  saveSectorMaster,
  updateSectorMaster,
} from "../../../api/modules/SectorMatser/index";
 
const SectorMasterForm = ({ 
  tableSectordata, 
  isEditMode, 
  editData, 
  onCancel 
}) => {
  const confirm = useConfirmation();

  const [formData, setFormData] = useState({
    sectorName: "",
    tenantId: 1,
  });

    const validateInput = (value) => {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  };
  
  const isSaveDisabled = !formData.sectorName;
 
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        sectorName: editData.sectorName || "",
        tenantId: editData.tenantId || 1,
      });
    }
  }, [editData, isEditMode]);
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'sectorName') {
      const sanitizedValue = validateInput(value);
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
      sectorName: "",
      tenantId: 1,
    });
  };
 
  const handleSave = async () => {
    if (!formData.sectorName || formData.sectorName.trim() === "") {
      toast.error("Sector name is required.");
      return;
    }

    try {
      const confirmed = await confirm({
        title: "Are you sure you want to save the details?",
        confirmText: "YES",
        cancelText: "NO",
      });

      if (!confirmed) return;

      let response;

      if (isEditMode && editData) {
        const data = {
          id: editData.id,
          tenantId: editData.tenantId || 1,
          sectorName: formData.sectorName.trim(),
          active: editData.active ?? "Y",
        };
        response = await updateSectorMaster(data);
      } else {
        const payload = {
          tenantId: formData.tenantId || 1,
          sectorName: formData.sectorName.trim(),
          active: "Y",
        };
        response = await saveSectorMaster(payload);
      }

      if (response?.data?.success) {
        tableSectordata();
        onCancel();
        toast.success(response.data.message || "Sector saved successfully!");
      } else {
        toast.error(response?.data?.message || "Failed to save sector.");
        console.error("Failed to save sector:", response);
      }
    } catch (error) {
      console.error("Error saving sector:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Box className="p-2 gap-2">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <span>Attendance /</span>
          <span className="font-semibold">Sector Master</span>
        </div>
        <IconButton onClick={onCancel} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
 
      {/* Form */}
      <Box display="flex" flexDirection="column" paddingTop="20px">
        <Grid container spacing={2} maxWidth="1000px">
          <Grid item>
            <CustomInput
              label="Sector Name"
              placeholder="Enter Sector Name"
              required
              name="sectorName"
              value={formData.sectorName}
              handleChange={handleChange}
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
 "h-[40px] w-[165px] rounded font-medium !rounded-[var(--border-radius)] !bg-[var(--primary-clr)] !text-[#FFF] hover:opacity-90 transition"
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
 
export default SectorMasterForm;