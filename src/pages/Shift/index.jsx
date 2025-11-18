import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const Shift = () => {
  return (
    <div>
      <HeadingComp
        heading="Shift Master"
        iconToShow={[]}
        handleButtonClick={() => {}}
        createButtonText="Create Shift"
      />
      <CustomTable1
        className="table-2"
        columns={[
          "Sl.No",
          "Shift Name",
          "Shift From",
          "Shift To",
          "Shift Type",
          "Status",
          "Actions",
        ]}
      />
    </div>
  );
};

export default Shift;
