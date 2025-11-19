import { useState } from "react";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateDepartment } from "./CreateDepartment";

const Department = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Department Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Department"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Department Name", "Status", "Actions"]}
      />
      <CreateDepartment {...{ isOpen, onClose }} />
    </div>
  );
};

export default Department;
