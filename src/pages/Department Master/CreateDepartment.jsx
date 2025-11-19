import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";

export const CreateDepartment = (props) => {
  const { isOpen, onClose } = props;
  return (
    <Modal
      {...{
        isOpen,
        onClose,
        dialogTitle: "Create Department",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <div className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 px-5 py-3 overflow-y-auto flex flex-col justify-between">
        <div className="flex-1 space-y-5">
          <CommonInput
            type="text"
            label="Department Name"
            placeholder="Enter Department Name"
          />
        </div>
        <div className="w-full flex gap-3">
          <button className="button-1 w-full button-3 rounded-md py-1.5 px-3">
            Reset
          </button>
          <button className="button-1 w-full rounded-md py-1.5 px-3">
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
};
