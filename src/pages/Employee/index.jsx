
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const Employee = () => {
  return (
    <div>
      <HeadingComp
        heading="Employee Master"
        iconToShow={[]}
        handleButtonClick={() => {}}
        createButtonText="Create Employee"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No","Name","Role","Phone","Mail","Department","Reporting Stuff","Outside Punch Status","Multiple ClockIn","Geo Sense","Status","Actions"]}
      />
    </div>
  );
};

export default Employee;
