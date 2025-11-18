import { CustomTable1 } from "../../components/Common/CustomTable1";
import { HeadingComp } from "../../components/Common/HeadingComp";

const Department = () => {
  return (
    <div>
      <HeadingComp
        heading="Department Master"
        iconToShow={[]}
        handleButtonClick={() => {}}
        createButtonText="Create Department"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Department Name", "Status", "Actions"]}
      />
    </div>
  );
};

export default Department;
