import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import DataTable from "../../../components/common/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import PageBreadcrumb from "../../../components/common/PageBreadCrumbs";
import TenantForm from "./TenantForm";
import {
  listTenants,
  getTenantById,
  updateTenantStatus,
} from "../../../api/modules/TenantMaster";
import toast from "react-hot-toast";

const TenantTable = () => {
  const [tableData, setTableData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleStatus = async (id) => {
    const row = tableData.find((item) => item.id === id);
    if (!row) return;

    const newStatus = row.status === "Active" ? "N" : "Y";

    try {
      const payload = {
        id: id,
        active: newStatus,
      };

      const res = await updateTenantStatus(payload);

      if (res.data.success) {
        setTableData((prevRows) =>
          prevRows.map((item) =>
            item.id === id
              ? { ...item, status: newStatus === "Y" ? "Active" : "Inactive" }
              : item
          )
        );
        toast.success(res.data.message || "Successfully added!");
      } else {
        console.error(res.data.message);
        toast.error(res.data.message || "failed to update");
      }
    } catch (error) {
      console.error("Error updating asset group status:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getTenantById(id);
      if (res.data.success) {
        setEditData({
          id: id,
          name: res.data.data.tenantName,
          contactEmail: res.data.data.email,
          contactPhone: res.data.data.phone,
          active: res.data.data.active,
        });
        setIsEditMode(true);
        setOpenForm(true);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching tenant:", error);
    }
  };

  const tableTenantData = async () => {
    try {
      const res = await listTenants();
      if (res.data.success) {
        const formattedData = res.data.data.map((item, index) => ({
          id: item.id,
          slNo: String(index + 1).padStart(2, "0"),
          name: item.tenantName,
          contactEmail: item.email,
          contactPhone: item.phone,
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
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  useEffect(() => {
    tableTenantData();
  }, []);

  const columns = [
    { field: "slNo", headerName: "Sl.No", flex: 0.5 },
    { field: "name", headerName: "Tenant Name", flex: 1.5 },
    { field: "contactEmail", headerName: "Contact Email", flex: 1.5 },
    { field: "contactPhone", headerName: "Contact Phone", flex: 1 },
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
    { field: "viewAction", headerName: "Action", flex: 0.8 },
  ];

  return (
    <div>
      <PageBreadcrumb parentTitle="Attendance" currentTitle="Tenant Master" />
      <DataTable
        columns={columns}
        data={tableData}
        title="Tenant"
        showSearch
        showAddButton
        pagination
        onAdd={() => {
          setEditData(null);
          setIsEditMode(false);
          setOpenForm(true);
        }}
      />
      <Dialog
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditData(null);
          setIsEditMode(false);
        }}
        maxWidth={false}
      >
        <DialogContent className="p-4">
          <div className="w-[700px]">
            <TenantForm
              onCancel={() => {
                setOpenForm(false);
                setEditData(null);
                setIsEditMode(false);
              }}
              editData={editData}
              isEditMode={isEditMode}
              tableTenantData={tableTenantData}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantTable;
