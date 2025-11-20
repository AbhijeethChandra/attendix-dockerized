import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const DeviceIn = () => {
  return (
    <div>
      <HeadingComp heading="Device Info" iconToShow={[]} />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Employee Name",
          "Device Info",
          "App Version",
          "Office Name",
        ]}
      />
    </div>
  );
};

export default DeviceIn;
