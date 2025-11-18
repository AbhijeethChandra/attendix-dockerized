
import { CustomTable1 } from "../../components/Common/CustomTable1";
import { HeadingComp } from "../../components/Common/HeadingComp";

const Sector = () => {
  return (
    <div>
      <HeadingComp
        heading="Sector Master"
        iconToShow={[]}
        handleButtonClick={() => {}}
        createButtonText="Create Sector"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Sector Name", "Status", "Actions"]}
      />
    </div>
  );
};

export default Sector;
