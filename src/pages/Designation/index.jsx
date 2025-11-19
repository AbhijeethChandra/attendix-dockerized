import { useState } from "react";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateDesignation } from "./CreateDesignation";
const Designation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Designation Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Designation"
      />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Designation Name",
          "Department",
          "Status",
          "Actions",
        ]}
      />
       <CreateDesignation {...{ isOpen, onClose }} />
    </div>
  );
};

export default Designation;
