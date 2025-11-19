import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { useState } from "react";
import { CreateShift } from "./CreateShift";

const Shift = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Shift Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Shift"
      />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Shift Name",
          "Shift From",
          "Shift To",
          "Shift Type",
          "Status",
          "Actions",
        ]}
      />
      <CreateShift {...{ isOpen, onClose }} />
    </div>
  );
};

export default Shift;
