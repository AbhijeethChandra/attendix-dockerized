import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { useState } from "react";
import { CreateEmployee } from "./CreateEmployee";

const Employee = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Employee Master"
        iconToShow={[]}
       handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Employee"
      />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Name",
          "Role",
          "Phone",
          "Mail",
          "Department",
          "Reporting Stuff",
          "Outside Punch Status",
          "Multiple ClockIn",
          "Geo Sense",
          "Status",
          "Actions",
        ]}
      />
       <CreateEmployee {...{ isOpen, onClose }} />
    </div>
  );
};

export default Employee;
