import { useState } from "react";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateShiftOver } from "./CreateShiftOverride";

const ShiftOver = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Shift Override"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Assign Shift Override"
      />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Office",
          "Employee",
          "Shift",
          "Override Date",
          "Reason",
          "Action",
        ]}
      />
      <CreateShiftOver {...{ isOpen, onClose }} />
    </div>
  );
};

export default ShiftOver;
