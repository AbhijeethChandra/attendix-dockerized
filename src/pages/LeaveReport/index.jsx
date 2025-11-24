import { useGetAllLeaveReportQuery } from "@/app/features/leavereport/leavereportApi";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSelector } from "react-redux";

const LeaveRep = () => {
  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);
  const [searchText, setSearchText] = useState("");

  const {
    data: leavereportData,
    isLoading,
    isError,
    refetch,
  } = useGetAllLeaveReportQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  const leavereport =
    leavereportData?.data?.length && !isError
      ? leavereportData.data
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
      <HeadingComp heading="Leave Report" iconToShow={[]} />
      <CustomTable1
        {...{
          isLoading: isLoading,
          datas: leavereport,
          columns: [
            "Sl.No",
            "Status",
            "Employee",
            "Office",
            "Leave Category",
            "Leave Type",
            "Session",
            "Request Reason",
            "Request Date",
            "Approved Date",
            "Applied Date",
            "Decision Date",
          ],
        }}
      />
    </div>
  );
};

export default LeaveRep;
