import React, { useEffect, useState } from "react";
import { Grid, Button, Box, TextareaAutosize, IconButton } from "@mui/material";
import CustomInput from "../../../components/common/CommonInput";
import { getParentOffice, getSector } from "../../../api/modules/OficeMaster";
import CloseIcon from "@mui/icons-material/Close";

const OfficeForm = ({
  onCancel,
  setFormData,
  formData,
  formDataFunc,
  isEditing,
  handleClear,
}) => {
  const [parentOfficeData, setParentOfficeData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
 const allowedCharRegex = /^[a-zA-Z0-9\s,.()-]*$/;

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Only update the state if the value contains allowed characters or is empty
    if (allowedCharRegex.test(value) || value === "") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    formDataFunc(formData);
  };

  // Fetch parent office data from API
  const fetchParentOffice = async () => {
    try {
      const resp = await getParentOffice();
      if (resp.data.success) {
        const formattedData = resp.data.data.map((office) => ({
          id: office.id,
          name: office.officeName,
          value: office.id,
          label: office.officeName,
        }));
        setParentOfficeData(formattedData);
      } else {
        console.error("API returned success: false");
        setParentOfficeData([]);
      }
    } catch (error) {
      console.error("Error fetching parent offices:", error);
      setParentOfficeData([]);
    }
  };

  const fetchSector = async (id) => {
    try {
      const resp = await getSector(id);
      if (resp.data.success) {
        const formattedData = resp.data.data.map((item) => ({
          id: item.id,
          name: item.sectorName,
          value: item.id,
          label: item.sectorName,
        }));
        setSectorData(formattedData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Fetch parent office data on component mount
  useEffect(() => {
    fetchParentOffice();
    fetchSector(formData.tenantId);
  }, []);

  const isSaveDisabled =
    !formData.officeName ||
    !formData.officeType ||
    !formData.address ||
    !formData.sectorId;

  return (
    <Box className="p-2 gap-2">
      <div className="flex items-center justify-between gap-2 mb-6 text-gray-600">
        <div>
          {" "}
          <span>Attendance /</span>
          <span className="font-semibold">Office Master</span>
        </div>
        <div>
          {" "}
          <IconButton onClick={onCancel} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems=""
          sx={{ mt: "20px" }}
        >
          <Grid container spacing={2} justifyContent="" maxWidth="1000px">
            {/* Row 1 */}
            <Grid item xs={12} md={4}>
              <CustomInput
                label="Office Name"
                placeholder="Enter Your Name"
                name="officeName"
                required
                handleChange={handleChange}
                value={formData.officeName || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomInput
                label="Sector"
                placeholder="Enter Sector"
                name="sectorId"
                required
                options={sectorData}
                value={formData.sectorId || ""}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomInput
                label="Office Type"
                placeholder="Select Office"
                name="officeType"
                required
                options={[
                  { label: "Select", value: "" },
                  { label: "Regional", value: "REGIONAL" },
                  { label: "Branch", value: "BRANCH" },
                  { label: "Department", value: "DEPARTMENT" },
                ]}
                value={formData.officeType || ""}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomInput
                label="Parent Office"
                placeholder="Select Parent Office"
                name="parentOfficeId"
                options={parentOfficeData}
                value={formData.parentOfficeId || ""}
                handleChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomInput
                label="Address"
                placeholder="Enter your Address"
                name="address"
                required
                multiline={true}
                minRows={6}
                width="100%"
                value={formData.address || ""}
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
                className="h-[40px] w-[165px] rounded !border !border-[var(--primary-clr)] !text-[var(--primary-clr)] font-medium !rounded-[var(--border-radius)]"
              >
                CLEAR
              </Button>

              <Button
                type="submit"
                disabled={isSaveDisabled}
                className={`
   "h-[40px] w-[165px] rounded font-medium !rounded-[var(--border-radius)] !bg-[var(--primary-clr)] !text-[#FFF] hover:opacity-90 transition"
    ${isSaveDisabled ? "opacity-50 cursor-not-allowed bg-gray-400" : ""}
  `}
              >
                {isEditing ? "Update" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default OfficeForm;
