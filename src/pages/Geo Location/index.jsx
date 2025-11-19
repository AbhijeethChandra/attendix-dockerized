import { useState } from "react";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateGeoLocation } from "./CreateGeoLocation";

const GeoLocation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <div>
      <HeadingComp
        heading="Geo Location"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Geo Location"
      />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Office Name",
          "Latitude",
          "Longitude",
          "Geo Radius",
          "Actions",
        ]}
      />
      <CreateGeoLocation {...{ isOpen, onClose }} />
    </div>
  );
};

export default GeoLocation;
