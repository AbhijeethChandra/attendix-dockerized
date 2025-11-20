import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";

export const CreateShiftAss = (props) => {
  const { isOpen, onClose } = props;
  return (
    <Modal
      {...{
        isOpen,
        onClose,
        dialogTitle: "Shift Assignment",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <div className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 py-3 overflow-y-auto flex flex-col justify-between">
        <div className="flex-1 space-y-5 overflow-y-auto px-5 pb-1">
          <CommonInput
            type="select"
            label="Office"
            options={[]}
            placeholder="Select Office"
          />
          <CommonInput
            type="select"
            label="Employee"
            options={[]}
            placeholder="Select Employee"
          />
          <CommonInput
            type="select"
            label="Shift"
            options={[]}
            placeholder="Select Shift"
          />
          <CommonInput type="date" label="Effective From" />
          <CommonInput type="date" label="Effective To" />
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
