import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const LeaveType = () => {
  return (
    <div>
      <HeadingComp
        heading="Leave Type"
        iconToShow={[]}
        handleButtonClick={() => {}}
        createButtonText="Create"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "LeaveType", "Description", "Status", "Actions"]}
      />
    </div>
  );
};

export default LeaveType;
