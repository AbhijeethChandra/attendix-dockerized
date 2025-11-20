import { useState } from "react";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateShiftAss } from "./CreateShiftAssignment";

const ShiftAss = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Shift Assignment"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Assign Shift Assignment"
      />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Office",
          "Employee",
          "Shift",
          "Effective From",
          "Effective To",
          "Action",
        ]}
      />
      <CreateShiftAss {...{ isOpen, onClose }} />
    </div>
  );
};

export default ShiftAss;
