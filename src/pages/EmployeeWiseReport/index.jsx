import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const EmployeeWiseRep = () => {
  return (
    <div>
      <HeadingComp heading="Employee Wise Report" iconToShow={[]} />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Employee",
          "Department",
          "Date",
          "Clock-In",
          "Clock-Out",
          "Working Hours",
          "Breaks",
        ]}
      />
    </div>
  );
};

export default EmployeeWiseRep;
