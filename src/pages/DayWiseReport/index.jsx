import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const DayWiseRep = () => {
  return (
    <div>
      <HeadingComp heading="Day Wise Report" iconToShow={[]} />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Employee",
          "Office",
          "Department",
          "Shfit Name",
          "Shift From",
          "Shift To",
          "Date",
          "Clock-In",
          "Clock-Out",
          "Working Hours",
          "Breaks",
          "Shift Start Margin",
          "Shift End Margin",
        ]}
      />
    </div>
  );
};

export default DayWiseRep;
