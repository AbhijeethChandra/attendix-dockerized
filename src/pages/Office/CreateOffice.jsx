import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";

export const CreateOffice = (props) => {
  const { isOpen, onClose } = props;
  return (
    <Modal
      {...{
        isOpen,
        onClose,
        dialogTitle: "Create Office",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <div className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 py-3 overflow-y-auto flex flex-col justify-between">
        <div className="flex-1 space-y-5 overflow-y-auto px-5 pb-1">
          <CommonInput
            type="text"
            label="Office Name"
            placeholder="Enter Office Name"
          />
          <CommonInput
            type="select"
            label="Office Type"
            options={[]}
            placeholder="Select Office Type"
          />
          <CommonInput
            type="select"
            label="Parent Office"
            options={[]}
            placeholder="Select Parent Office"
          />
          <CommonInput
            type="select"
            label="Country"
            options={[]}
            placeholder="Select Country"
          />
          <CommonInput
            type="select"
            label="State"
            options={[]}
            placeholder="Select State"
          />
          <CommonInput
            type="textarea"
            label="Address"
            placeholder="Enter Address"
          />
        </div>
        <div className="w-full flex gap-3 px-5 ">
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
