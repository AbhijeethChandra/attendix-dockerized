import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { useState } from "react";
import { CreateLeaveType } from "./CreateLeaveType";

const LeaveType = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Leave Type"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "LeaveType", "Description", "Status", "Actions"]}
      />
      <CreateLeaveType {...{ isOpen, onClose }} />
    </div>
  );
};

export default LeaveType;
