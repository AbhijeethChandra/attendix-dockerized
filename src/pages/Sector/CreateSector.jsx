import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import {
  useCreateSectorMutation,
  useUpdateSectorMutation,
} from "../../app/features/sector/sectorApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const INITIAL_STATE = {
  sectorName: "",
};

export const CreateSector = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_STATE);
  const user = useSelector((state) => state.auth.user);

  const [createApi, createApiRes] = useCreateSectorMutation();
  const [editApi, editApiRes] = useUpdateSectorMutation();

  useEffect(() => {
    if (typeof isOpen === "object" && isOpen !== null) {
      setDetails({
        id: isOpen.id,
        sectorName: isOpen.sectorName,
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
        dialogTitle: "Create Sector",
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
            name="sectorName"
            value={details.sectorName}
            onChange={handleChange}
            label="Sector Name"
            placeholder="Enter Sector Name"
          />
        </div>
        <div className="w-full flex gap-3">
          <button
            type="reset"
            onClick={() => {
              setDetails(INITIAL_STATE);
            }}
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
