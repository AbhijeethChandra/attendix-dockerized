import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const LeaveRep = () => {
  return (
    <div>
      <HeadingComp heading="Leave Report" iconToShow={[]} />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Status",
          "Employee",
          "Office",
          "Leave Category",
          "Leave Type",
          "Session",
          "Request Reason",
          "Request Date",
          "Approved Date",
          "Applied Date",
          "Decision Date",

        ]}
      />
    </div>
  );
};

export default LeaveRep;
