import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import DataTable from "../../../components/common/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import PageBreadcrumb from "../../../components/common/PageBreadCrumbs";
import OfficeForm from "./OfficeForm";
import {
  getbyId,
  getTableData,
  postFormData,
  putUpdate,
  updateStatus,
} from "../../../api/modules/OficeMaster";
import toast from "react-hot-toast";
import { useConfirmation } from "../../../context/ConfirmationContext";

const OfficeMasterTable = () => {
  const confirm = useConfirmation();
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOfficeId, setSelectedOfficeId] = useState(null);
  const [formData, setFormData] = useState({
    officeName: "",
    sectorId: "",
    officeType: "",
    parentOfficeId: "",
    address: "",
    active: "Y",
    tenantId: 1,
  });
  const [openForm, setOpenForm] = useState(false);

  // Fetch table data
  const tableDataFunc = async () => {
    try {
      const res = await getTableData();
      if (res.data.success) {
        const formattedData = res.data.data.map((item, index) => ({
          id: item.id,
          slNo: String(index + 1).padStart(2, "0"),
          sector: item.sectorName,
          name: item.officeName,
          officeType: item.officeType,
          parentOffice: item.parentOfficeName || "",
          address: item.address,
          status: item.active === "Y" ? "Active" : "Inactive",
          viewAction: (
            <EditIcon
              onClick={() => handleEdit(item.id)}
              style={{ cursor: "pointer" }}
            />
          ),
        }));
        setTableData(formattedData);
      } else {
        setTableData([]);
        toast.error(res.data.message || "Failed to fetch table data");
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
      setTableData([]);
      toast.error("Error fetching table data");
    }
  };

  // Toggle status
  const toggleStatus = async (index) => {
    const row = tableData.find((item) => item.id === index);
    if (!row) return;

    const currentAPIStatus = row.status === "Active" ? "Y" : "N";
    const newAPIStatus = currentAPIStatus === "Y" ? "N" : "Y";
    const newUIStatus = row.status === "Active" ? "Inactive" : "Active";

    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === index ? { ...row, status: newUIStatus } : row
      )
    );

    try {
      await updateStatus(row.id, newAPIStatus);
      toast.success("Status updated successfully");
    } catch (error) {
      setTableData((prevData) =>
        prevData.map((row) =>
          row.id === index ? { ...row, status: row.status } : row
        )
      );
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  // Handle Edit functionality
  const handleEdit = async (id) => {
    try {
      const resp = await getbyId(id);
      if (resp.data.success) {
        const officeData = resp.data.data;
        setFormData({
          id: officeData.id,
          officeName: officeData.officeName,
          sectorId: officeData.sectorId,
          officeType: officeData.officeType,
          parentOfficeId: officeData.parentOfficeId || "",
          address: officeData.address,
          active: officeData.active === "Y" ? "Y" : "N",
          tenantId: officeData.tenantId || 1,
        });
        setSelectedOfficeId(id);
        setIsEditing(true);
        setOpenForm(true);
      } else {
        console.error("Failed to fetch office data:", resp.data.message);
        toast.error(resp.data.message || "Failed to fetch office data");
      }
    } catch (error) {
      console.error("Error fetching office data:", error);
      toast.error("Error fetching office data");
    }
  };

  // Add form data
  const addFormData = async (data) => {
    try {
      const res = await postFormData(data);
      if (res.data.success) {
        tableDataFunc();
        setOpenForm(false); // Explicitly close modal
        toast.success(res.data.message || "Successfully added!");
      } else {
        toast.error(res.data.message || "Failed to add office");
      }
    } catch (error) {
      console.error("Error adding office:", error);
      toast.error("Error adding office");
    }
  };

  // Update office data
  const updateOfficeData = async (updatedData) => {
    try {
      const response = await putUpdate(updatedData);
      if (response.data.success) {
        toast.success(response.data.message || "Successfully updated!");
        tableDataFunc();
        setOpenForm(false);
        setIsEditing(false);
        setSelectedOfficeId(null);
        setFormData({
          officeName: "",
          sectorId: "",
          officeType: "",
          parentOfficeId: "",
          address: "",
          active: "Y",
          tenantId: 1,
        });
      } else {
        toast.error(response.data.message || "Failed to update office");
      }
    } catch (error) {
      console.error("Error updating office:", error);
      toast.error("Error updating office");
    }
  };

  // Handle form submission
  const formDataFunc = async (formData) => {
    try {
      const confirmed = await confirm({
        title: "Are you sure to save the details...?",
        confirmText: "YES",
        cancelText: "NO",
      });

      if (!confirmed) {
        return; // User cancelled the operation
      }

      // Validate form data
      if (!formData.officeName || !formData.officeType || !formData.address) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (isEditing) {
        await updateOfficeData({ ...formData, id: selectedOfficeId });
      } else {
        await addFormData(formData);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      toast.error("Error saving form data");
    }
  };

  // Handle form clear
  const handleClear = () => {
    setFormData({
      officeName: "",
      sectorId: "",
      officeType: "",
      parentOfficeId: "",
      address: "",
      active: "Y",
      tenantId: 1,
    });
  };

  useEffect(() => {
    tableDataFunc();
  }, []);

  const columns = [
    { field: "slNo", headerName: "Sl.No", flex: 0.5 },
    { field: "sector", headerName: "Sector", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "officeType", headerName: "Office Type", flex: 1 },
    { field: "parentOffice", headerName: "Parent Office", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      render: (row) => (
        <div style={{ width: "100px" }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 2,
              color: row.status === "Active" ? "green" : "red",
              borderColor: row.status === "Active" ? "green" : "red",
              width: "80px",
            }}
            onClick={() => toggleStatus(row.id)}
          >
            {row.status}
          </Button>
        </div>
      ),
    },
    {
      field: "viewAction",
      headerName: "Action",
      flex: 0.5,
      render: (row) => row.viewAction,
    },
  ];

  return (
    <div>
      <PageBreadcrumb parentTitle="Attendance" currentTitle="Office Master" />
      <DataTable
        columns={columns}
        data={tableData}
        title="Office Master"
        showSearch
        showAddButton
        pagination
        onAdd={() => {
          setIsEditing(false);
          setSelectedOfficeId(null);
          setFormData({
            officeName: "",
            sectorId: "",
            officeType: "",
            parentOfficeId: "",
            address: "",
            active: "Y",
            tenantId: 1,
          });
          setOpenForm(true);
        }}
      />
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        maxWidth={false}
      >
        <DialogContent className="p-4">
          <div className="w-[1000px] max-w-full">
            <OfficeForm
              onCancel={() => setOpenForm(false)}
              setFormData={setFormData}
              formData={formData}
              formDataFunc={formDataFunc}
              isEditing={isEditing}
              handleClear={handleClear}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OfficeMasterTable;
