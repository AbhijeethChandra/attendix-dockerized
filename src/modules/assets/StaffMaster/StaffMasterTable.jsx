import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import DataTable from "../../../components/common/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import PageBreadcrumb from "../../../components/common/PageBreadCrumbs";
import StaffMasterForm from "./StaffMasterForm";
import {
  listVendorMaster,
  getVendorMasterById,
  updateVendorMasterStatus,
} from "../../../api/modules/VendorMaster/index";
import toast from "react-hot-toast";

const StaffMasterTable = () => {
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

      const res = await updateVendorMasterStatus(payload);

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
      const res = await getVendorMasterById(id);
      if (res.data.success) {
        setEditData({
          id: res.data.data.id,
          vendorTypeId: res.data.data.vendorTypeId,
          vendorName: res.data.data.vendorName,
          contactPerson: res.data.data.contactPerson,
          phone: res.data.data.phno,
          email: res.data.data.email,
          address: res.data.data.address || "",
          countryId: res.data.data.countryId,
          stateId: res.data.data.stateId,
          districtId: res.data.data.districtId,
          cityId: res.data.data.cityId,
          pincode: res.data.data.pincode,
          active: res.data.data.active,
        });
        setIsEditMode(true);
        setOpenForm(true);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching vendor type:", error);
    }
  };

  const tableVendordata = async () => {
    try {
      const res = await listVendorMaster();
      if (res.data.success) {
        const formattedData = res.data.data.map((item, index) => ({
          id: item.id,
          slNo: String(index + 1).padStart(2, "0"),
          vendorType: item.vendorTypeId,
          vendorName: item.vendorName,
          country: item.countryId,
          contactPerson: item.contactPerson,
          contactNo: item.phno,
          email: item.email,
          active: item.active,
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
      console.error("Error fetching vendor types:", error);
    }
  };

  useEffect(() => {
    tableVendordata();
  }, []);

  const columns = [
    { field: "slNo", headerName: "Sl.No", flex: 0.5 },
    { field: "vendorName", headerName: "Staff Name", flex: 1.5 },
    { field: "vendorType", headerName: "Staff Id", flex: 1.5 },
    { field: "vendorType", headerName: "Role", flex: 1.5 },
    // { field: "country", headerName: "Country", flex: 1 },
    // { field: "contactPerson", headerName: "Contact Person", flex: 1 },
    { field: "contactNo", headerName: "Contact No", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      render: (row) => (
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 2,
            color: row.status === "Active" ? "green" : "red",
            borderColor: row.status === "Active" ? "green" : "red",
          }}
          onClick={() => toggleStatus(row.id)}
        >
          {row.status}
        </Button>
      ),
    },
    { field: "viewAction", headerName: "Action", flex: 0.8 },
  ];

  return (
    <div>
      <PageBreadcrumb parentTitle="Attendance" currentTitle="Staff Master " />
      <DataTable
        columns={columns}
        data={tableData}
        title="Staff Master"
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
        onClose={() => setOpenForm(false)}
        maxWidth={false}
      >
        <DialogContent className="p-4">
          <div className="w-[1000px] max-w-full">
            <StaffMasterForm
              onCancel={() => {
                setOpenForm(false);
                setEditData(null);
                setIsEditMode(false);
              }}
              editData={editData}
              isEditMode={isEditMode}
              tableData={tableVendordata}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffMasterTable;
