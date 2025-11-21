import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../../app/features/department/departmentApi";
const INITIAL_STATE = {
  deptname: "",
};
export const CreateDepartment = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_STATE);
  const user = useSelector((state) => state.auth.user);

  const [createApi, createApiRes] = useCreateDepartmentMutation();
  const [editApi, editApiRes] = useUpdateDepartmentMutation();

  useEffect(() => {
    if (typeof isOpen === "object" && isOpen !== null) {
      setDetails({
        id: isOpen["-id"],
        deptname: isOpen.deptname,
      });
    } else {
      setDetails(INITIAL_STATE);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

      if (details.id) await editApi(submitData);
      else await createApi(submitData);
      setDetails(INITIAL_STATE);
      refetch();
      onClose();
    } catch (err) {
      console.log("Error creating sector:", err);
    }
  };
  return (
    <Modal
      {...{
        isOpen: isOpen ? true : false,
        onClose,
        dialogTitle: "Create Department",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 px-5 py-3 overflow-y-auto flex flex-col justify-between"
      >
        <div className="flex-1 space-y-5">
          <CommonInput
            type="text"
            required
            name="deptname"
            value={details.deptname}
            onChange={handleChange}
            label="Department Name"
            placeholder="Enter Department Name"
          />
        </div>
        <div className="w-full flex gap-3">
          <button
            type="reset"
            className="button-1 w-full button-3 rounded-md py-1.5 px-3"
          >
            Reset
          </button>
          <button
            type="submit"
            className="button-1 w-full rounded-md py-1.5 px-3"
          >
            {details.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
