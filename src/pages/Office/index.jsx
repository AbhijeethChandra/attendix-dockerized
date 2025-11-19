import { useState } from "react";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateOffice } from "./CreateOffice";

const Office = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Office Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Office"
      />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Sector",
          "Name",
          "Office Type",
          "Parent Office",
          "Adderss",
          "Status",
          "Action",
        ]}
      />
      <CreateOffice {...{ isOpen, onClose }} />
    </div>
  );
};

export default Office;
