import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useCreateRoleMutation, useUpdateRoleMutation } from "@/app/rtkQueries/rolemasterApi";

const INITIAL_DETAILS = {
  name: "",
  description: "",
};

export const CreateRoleMaster = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const user = useSelector((state) => state.auth.user);

  const [createApi, createApiRes] = useCreateRoleMutation();
  const [editApi, editApiRes] = useUpdateRoleMutation();

  useEffect(() => {
    if (typeof isOpen === "object" && isOpen !== null) {
      setDetails({
        id: isOpen.id,
        name: isOpen.name,
        description: isOpen.description,
      });
    } else {
      setDetails(INITIAL_DETAILS);
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

      if (details.id) await editApi(submitData).unwrap();
      else await createApi(submitData).unwrap();
      setDetails(INITIAL_DETAILS);
      refetch();
      onClose();
      toast.success(`Role ${details.id ? "updated" : "created"} successfully`);
    } catch (err) {
      console.log("Error creating Role:", err);
    }
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Create RoleS",
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
            name="name"
            value={details.name}
            onChange={handleChange}
            label="Role Name"
            placeholder="Enter Role Name"
          />
          <CommonInput
            type="text"
            required
            name="description"
            value={details.description}
            onChange={handleChange}
            label="description"
            placeholder="Enter description"
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
            disabled={createApiRes.isLoading || editApiRes?.isLoading}
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
