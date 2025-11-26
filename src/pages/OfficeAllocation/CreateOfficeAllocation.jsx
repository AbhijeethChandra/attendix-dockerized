import { Modal } from "@/components/Common/Modal";
import { SearchBar } from "@/components/Common/SearchBar";
import { useState } from "react";
import { useGetActiveOfficesQuery } from "@/app/rtkQueries/officeApi";
import { useSelector } from "react-redux";
import { useGetOfficeActiveEmployeesQuery } from "@/app/rtkQueries/employeeApi";
import { useCreateOfficeAllocationMutation } from "@/app/rtkQueries/officeAllocationApi";
import { skipToken } from "@reduxjs/toolkit/query";

const INITIAL_DETAILS = {
  userId: "",
  tenantId: "",
  officeId: [],
};

export const CreateOfficeAllocation = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  //queries
  const { data: offices } = useGetActiveOfficesQuery(
    user.tenant_id ?? skipToken
  );

  const { data: employees } = useGetOfficeActiveEmployeesQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  //mutations
  const [createApi, createApiRes] = useCreateOfficeAllocationMutation();

  const officesOptions = offices?.data
    ? offices?.data.map((data) => ({
        id: data.id,
        name: data.officeName,
        label: data.officeName,
        value: data.id,
      }))
    : [];

  const employeesOptions = employees?.data
    ? employees?.data.map((data) => ({
        id: data.id,
        name: data.fullName,
        label: data.fullName,
        value: data.id,
      }))
    : [];

  const handleSelectChange = (value, name) => {
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...details,
        tenantId: user.tenant_id,
        active: "Y",
      };

      await createApi(submitData).unwrap();

      setDetails(INITIAL_DETAILS);
      refetch();
      toast.success("Office Allocation saved successfully");
    } catch (err) {
      console.log("Error creating Office Allocation:", err);
    }
  };

  return (
    <Modal
      {...{
        isOpen,
        onClose,
        dialogTitle: "Office Allocation",
        panelClass: "w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 px-5 py-3 overflow-y-auto flex flex-col justify-between"
      >
        <div className="flex-1 space-y-3 gap-x-4 content-start ">
          <SearchBar
            required
            options={employeesOptions}
            onChange={(value) => handleSelectChange(value, "userId")}
            value={details.userId}
            label="Employee"
            placeholder="Search Employee"
          />
          <SearchBar
            required
            multiple
            containerClass="flex-wrap"
            onChange={(value) => handleSelectChange(value, "officeId")}
            value={details.officeId}
            options={officesOptions}
            label="Offices"
            placeholder="Select Offices"
          />
        </div>

        <div className="w-full flex gap-3">
          <button
            type="reset"
            onClick={() => setDetails(INITIAL_DETAILS)}
            className="button-1 w-full button-3 rounded-md py-1.5 px-3"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={createApiRes.isLoading}
            className="button-1 w-full rounded-md py-1.5 px-3"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};
