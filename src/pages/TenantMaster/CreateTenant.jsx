import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateTenantMutation,
  useUpdateTenantMutation,
} from "@/app/rtkQueries/tenantApi";

const INITIAL_DETAILS = {
  tenantName: "",
  email: "",
  phone: "",
};

export const CreateTenantMaster = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);

  const [createApi, createApiRes] = useCreateTenantMutation();
  const [editApi, editApiRes] = useUpdateTenantMutation();

  useEffect(() => {
    if (typeof isOpen === "object" && isOpen !== null) {
      setDetails({
        id: isOpen.id,
        tenantName: isOpen.tenantName,
        email: isOpen.email,
        phone: isOpen.phone,
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
        active: "Y",
      };

      if (details.id) await editApi(submitData).unwrap();
      else await createApi(submitData).unwrap();
      setDetails(INITIAL_DETAILS);
      refetch();
      onClose();
      toast.success(
        `Tenant ${details.id ? "updated" : "created"} successfully`
      );
    } catch (err) {
      console.log("Error creating tenant:", err);
    }
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Create Tenant",
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
            name="tenantName"
            value={details.tenantName}
            onChange={handleChange}
            label="Tenant Name"
            placeholder="Enter tenant Name"
          />
          <CommonInput
            type="email"
            required
            name="email"
            value={details.email}
            onChange={handleChange}
            label="Email"
            placeholder="Enter email"
          />
          <CommonInput
            type="number"
            required
            name="phone"
            value={details.phone}
            onChange={handleChange}
            label="Phone Number"
            placeholder="Enter phone number"
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
            disabled={createApiRes.isLoading || editApiRes.isLoading}
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
