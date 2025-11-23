import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { SearchBar } from "@/components/Common/SearchBar";
import { useEffect, useState } from "react";
import { useGetActiveOfficesQuery } from "@/app/rtkQueries/officeApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useCreateShiftAssignMutation,
  useUpdateShiftAssignMutation,
} from "@/app/rtkQueries/shiftAssignApi";
import { useGetOfficeEmployeesQuery } from "@/app/rtkQueries/employeeApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetAllOfficeActiveShiftsQuery } from "@/app/rtkQueries/shiftApi";
import dayjs from "dayjs";

const INITIAL_DETAILS = {
  tenantId: "",
  officeId: "",
  staffId: "",
  shiftId: "",
  effectiveFrom: "",
  effectiveTo: "",
  createdBy: "",
};

export const CreateShiftAss = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  //queries
  const { data: offices } = useGetActiveOfficesQuery(
    user.tenant_id ?? skipToken
  );

  const { data: officeEmployees } = useGetOfficeEmployeesQuery(
    details.officeId
      ? {
          tenantId: user.tenant_id,
          officeId: details.officeId,
        }
      : skipToken
  );

  const { data: shifts } = useGetAllOfficeActiveShiftsQuery(
    details.officeId
      ? {
          tenantId: user.tenant_id,
          officeId: details.officeId,
        }
      : skipToken
  );

  //mutations
  const [createApi, createApiRes] = useCreateShiftAssignMutation();
  const [editApi, editApiRes] = useUpdateShiftAssignMutation();

  const officesOptions = offices?.data
    ? offices?.data.map((data) => ({
        id: data.id,
        name: data.officeName,
        label: data.officeName,
        value: data.id,
      }))
    : [];

  const officeEmployeesOptions =
    officeEmployees?.data && !!(details.officeId ?? false)
      ? officeEmployees?.data.map((data) => ({
          id: data.id,
          name: data.fullName,
          label: data.fullName,
          value: data.id,
        }))
      : [];

  const shiftOptions =
    shifts?.data && !!(details.officeId ?? false)
      ? shifts?.data.map((data) => ({
          id: data.id,
          name: data.shiftName,
          label: data.shiftName,
          value: data.id,
        }))
      : [];

  useEffect(() => {
    if (typeof isOpen === "object" && isOpen !== null) {
      setDetails({
        ...isOpen,
      });
    } else {
      setDetails(INITIAL_DETAILS);
    }
  }, [isOpen]);

  const handleSelectChange = ({ name, value }) => {
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = ({ name, date }) => {
    setDetails((prev) => ({
      ...prev,
      [name]: dayjs(date).format("YYYY-MM-DD"),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...details,
        tenantId: user.tenant_id,
        createdBy: user.id,
      };

      if (details.id) await editApi(submitData).unwrap();
      else await createApi(submitData).unwrap();

      setDetails(INITIAL_DETAILS);
      refetch();
      onClose();
      toast.success("Shift Assignment saved successfully");
    } catch (err) {
      console.log("Error creating Shift Assignment:", err);
    }
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Shift Assignment",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 py-3 overflow-y-auto flex flex-col justify-between"
      >
        <div className="flex-1 space-y-5 overflow-y-auto px-5 pb-1">
          <SearchBar
            required
            label="Office"
            options={officesOptions}
            placeholder="Select Office"
            name="officeId"
            value={details.officeId}
            onChange={(value) =>
              handleSelectChange({ name: "officeId", value })
            }
          />
          <SearchBar
            required
            label="Employee"
            options={officeEmployeesOptions}
            name="staffId"
            value={details.staffId}
            onChange={(value) => handleSelectChange({ name: "staffId", value })}
            placeholder={
              details.officeId
                ? "Select Employee"
                : "Please select office first"
            }
          />
          <SearchBar
            required
            label="Shift"
            options={shiftOptions}
            name="shiftId"
            value={details.shiftId}
            onChange={(value) => handleSelectChange({ name: "shiftId", value })}
            placeholder={
              details.officeId ? "Select Shift" : "Please select office first"
            }
          />
          <CommonInput
            required
            type="date"
            label="Effective From"
            name="effectiveFrom"
            value={details.effectiveFrom}
            onChange={(date) =>
              handleDateChange({ name: "effectiveFrom", date })
            }
          />
          <CommonInput
            required
            type="date"
            label="Effective To"
            name="effectiveTo"
            value={details.effectiveTo}
            onChange={(date) => handleDateChange({ name: "effectiveTo", date })}
          />
        </div>
        <div className="w-full flex gap-3 px-5 ">
          <button
            type="reset"
            onClick={() => setDetails(INITIAL_DETAILS)}
            className="button-1 w-full button-3 rounded-md py-1.5 px-3"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={createApiRes.isLoading || editApiRes.isLoading}
            className="button-1 w-full rounded-md py-1.5 px-3"
          >
            {details.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
