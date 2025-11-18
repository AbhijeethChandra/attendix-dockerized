import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";

const WeekendMas = () => {
  return (
    <div>
      <HeadingComp heading="Weekend Master" iconToShow={[]} />
      <CustomTable1
        className="table-2"
        columns={["Day", "Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]}
      />
    </div>
  );
};

export default WeekendMas;
