import { useGetAllEmployeeWiseReportQuery } from "@/app/features/employeewisereport/employeewisereportApi";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSelector } from "react-redux";

const EmployeeWiseRep = () => {
  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);
  const [searchText, setSearchText] = useState("");

  const {
    data: employeewisereportData,
    isLoading,
    isError,
    refetch,
  } = useGetAllEmployeeWiseReportQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  const employeewisereport =
    employeewisereportData?.data?.length && !isError
      ? employeewisereportData.data
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
      <HeadingComp heading="Employee Wise Report" iconToShow={[]} />
      <CustomTable1
        {...{
          isLoading: isLoading,
          datas: employeewisereport,
          columns: [
            "Sl.No",
            "Employee",
            "Department",
            "Date",
            "Clock-In",
            "Clock-Out",
            "Working Hours",
            "Breaks",
          ],
        }}
      />
    </div>
  );
};

export default EmployeeWiseRep;
