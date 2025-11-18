
import { CustomTable1 } from "../../components/Common/CustomTable1";
import { HeadingComp } from "../../components/Common/HeadingComp";

const GeoLocation = () => {
  return (
    <div>
      <HeadingComp
        heading="Geo Location"
        iconToShow={[]}
        handleButtonClick={() => {}}
        createButtonText="Create Geo Location"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Office Name", "Latitude","Longitude","Geo Radius", "Actions"]}
      />
    </div>
  );
};

export default GeoLocation;
