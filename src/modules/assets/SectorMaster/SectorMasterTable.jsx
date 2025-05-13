import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import DataTable from "../../../components/common/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import PageBreadcrumb from "../../../components/common/PageBreadCrumbs";
import SectorMasterForm from "./SectorMasterForm";
import toast from "react-hot-toast";

import {
  listSectorMaster,
  getSectorMasterById,
  updateSectorMasterStatus,
} from "../../../api/modules/SectorMatser/index";

const SectorMasterTable = () => {
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

      const res = await updateSectorMasterStatus(payload);

      if (res.data.success) {
        setTableData((prevRows) =>
          prevRows.map((item) =>
            item.id === id
              ? { ...item, status: newStatus === "Y" ? "Active" : "Inactive" }
              : item
          )
        );
        toast.success(res.data.message || "Status updated successfully!");
      } else {
        toast.error(res.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating asset type status:", error);
      toast.error("Something went wrong while updating status.");
    }
  };

  const handleEdit = async (id) => {
    console.log("id :>> ", id);
    try {
      const res = await getSectorMasterById(id);
      if (res.data.success) {
        setEditData({
          id: id,
          sectorName: res.data.data.sectorName,
          active: res.data.data.active,
          tenantId: res.data.data.tenantId,
        });
        setIsEditMode(true);
        setOpenForm(true);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching sector:", error);
    }
  };

  const tableSectordata = async () => {
    try {
      const res = await listSectorMaster();
      if (res.data.success) {
        const formattedData = res.data.data.map((item, index) => ({
          id: item.id,
          slNo: String(index + 1).padStart(2, "0"),
          sectorName: item.sectorName,
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
      console.error("Error fetching sectors:", error);
    }
  };

  useEffect(() => {
    tableSectordata();
  }, []);

  const columns = [
    { field: "slNo", headerName: "Sl.No", flex: 0.5 },
    { field: "sectorName", headerName: "Sector Name", flex: 1.5 },
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
      <PageBreadcrumb parentTitle="Attendance" currentTitle="Sector Master" />
      <DataTable
        columns={columns}
        data={tableData}
        title="Sector Master"
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
            <SectorMasterForm
              onCancel={() => {
                setOpenForm(false);
                setEditData(null);
                setIsEditMode(false);
              }}
              editData={editData}
              isEditMode={isEditMode}
              tableSectordata={tableSectordata}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SectorMasterTable;
