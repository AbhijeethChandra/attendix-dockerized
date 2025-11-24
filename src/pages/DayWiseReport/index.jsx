import { useGetAllDayWiseReportQuery } from "@/app/features/daywisereport/daywisereportApi";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSelector } from "react-redux";

const DayWiseRep = () => {
  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);
  const [searchText, setSearchText] = useState("");

  const {
    data: daywisereportData,
    isLoading,
    isError,
    refetch,
  } = useGetAllDayWiseReportQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  const daywisereport =
    daywisereportData?.data?.length && !isError
      ? daywisereportData.data
          .filter((data) =>
            data?.officeName?.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((data, index) => ({
            other: {
              ...data,
            },
            tableData: {
              sl: index + 1,
              officeName: data.officeName,
              latitude: data.latitude,
              longitude: data.longitude,
              geoRadius: data.geoRadius,
            },
          }))
      : [];
  return (
    <div>
      <HeadingComp heading="Day Wise Report" iconToShow={[]} />
      <CustomTable1
        {...{
          isLoading: isLoading,
          datas: daywisereport,
          columns: [
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
          ],
        }}
      />
    </div>
  );
};

export default DayWiseRep;
