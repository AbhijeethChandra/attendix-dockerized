import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const AttendanceReq = () => {
  return (
    <div>
      <HeadingComp
        heading="Attendance Request"
        iconToShow={[]}
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Employee", "Location", "Office","Date","Request Time"]}
      />
    </div>
  );
};

export default AttendanceReq;
