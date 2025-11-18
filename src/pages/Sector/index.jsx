import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateSector } from "./CreateSector";
import { useState } from "react";

const Sector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  
  return (
    <div>
      <HeadingComp
        heading="Sector Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Sector"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Sector Name", "Status", "Actions"]}
      />
      <CreateSector {...{ isOpen, onClose }} />
    </div>
  );
};

export default Sector;
