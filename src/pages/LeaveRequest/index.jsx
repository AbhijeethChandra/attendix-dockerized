import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const LeaveReq = () => {
  return (
    <div>
      <HeadingComp heading="Leave Request" iconToShow={[]} />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Employee Name",
          "Office",
          "Leave Category",
          "Leave Type",
          "Request Date",
        ]}
      />
    </div>
  );
};

export default LeaveReq;
