import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const OfficeAllocation = () => {
  return (
    <div>
      <HeadingComp
        heading="Office Allocation"
        iconToShow={[]}
        handleButtonClick={() => {}}
        createButtonText="Allocate Office"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Name", "Phone", " Mail", "Tenant Name", "Office"]}
      />
    </div>
  );
};

export default OfficeAllocation;
