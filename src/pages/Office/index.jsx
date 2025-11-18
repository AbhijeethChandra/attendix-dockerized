
import { CustomTable1 } from "../../components/Common/CustomTable1";
import { HeadingComp } from "../../components/Common/HeadingComp";

const Office = () => {
  return (
    <div>
      <HeadingComp
        heading="Office Master"
        iconToShow={[]}
        handleButtonClick={() => {}}
        createButtonText="Create Office"
      />
      <CustomTable1
        className="table-2"
        columns={["Sl.No", "Sector", "Name", "Office Type","Parent Office","Adderss","Status","Action"]}
      />
    </div>
  );
};

export default Office;
