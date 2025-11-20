import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { SearchBar } from "@/components/Common/SearchBar";

export const CreateOfficeAllocation = (props) => {
  const { isOpen, onClose } = props;
  return (
    <Modal
      {...{
        isOpen,
        onClose,
        dialogTitle: "Employee Office Allocation",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <div className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 px-5 py-3 overflow-y-auto flex flex-col justify-between">
        <div className="flex-1 space-y-5">
          <CommonInput
            type="select"
            label="Department"
            options={[]}
            placeholder="Select Department"
          />
          <SearchBar label="Employee" placeholder="Search Employee" />
          <SearchBar label="Office" placeholder="Search Office" />
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
