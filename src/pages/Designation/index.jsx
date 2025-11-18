
import { CustomTable1 } from "../../components/Common/CustomTable1";
import { HeadingComp } from "../../components/Common/HeadingComp";

const Designation = () => {
  return (
    <div>
      <HeadingComp
        heading="Designation Master"
        iconToShow={[]}
        handleButtonClick={() => {}}
        createButtonText="Create Designation"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Designation Name","Department", "Status", "Actions"]}
      />
    </div>
  );
};

export default Designation;
