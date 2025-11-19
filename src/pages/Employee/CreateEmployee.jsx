import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { SearchBar } from "@/components/Common/SearchBar";
import { ToggleSwitch } from "@/components/Common/ToggleSwitch";

export const CreateEmployee = (props) => {
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
          <CommonInput type="text" label="Name" placeholder="Enter Name" />
          <SearchBar label="Office" placeholder="Search Office" />
          <CommonInput
            type="select"
            label="Role"
            options={[]}
            placeholder="Select Role"
          />
          <CommonInput
            type="select"
            label="Department"
            options={[]}
            placeholder="Select Department"
          />
          <CommonInput
            type="select"
            label="Designation"
            options={[]}
            placeholder="Select Designation"
          />
          <CommonInput
            type="number"
            label="Phone"
            placeholder="Enter Phone Number"
          />
          <CommonInput type="email" label="Email" placeholder="Enter Email" />
          <CommonInput
            type="select"
            label="Reporting Staff"
            options={[]}
            placeholder="Select Reporting Staff"
          />
          <div className="flex items-center justify-between w-full">
            <label>Outside Punch Request</label>
            <ToggleSwitch />
          </div>
          <div className="flex items-center justify-between w-full">
            <label>Multiple Clock-In</label>
            <ToggleSwitch />
          </div>
          <div className="flex items-center justify-between w-full">
            <label>Geosense</label>
            <ToggleSwitch />
          </div>
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
