import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { useState } from "react";
import { CreateOfficeAllocation } from "./CreateOfficeAllocation";

const OfficeAllocation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Office Allocation"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Allocate Office"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Name", "Phone", " Mail", "Tenant Name", "Office"]}
      />
      <CreateOfficeAllocation {...{ isOpen, onClose }} />
    </div>
  );
};

export default OfficeAllocation;
