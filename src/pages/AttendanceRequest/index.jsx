import { useGetAllattendanceRequestQuery } from "@/app/features/attendancerequest/attendancerequestApi";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSelector } from "react-redux";

const AttendanceReq = () => {
  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);
  const [searchText, setSearchText] = useState("");
  const {
    data: attendancerequestData,
    isLoading,
    isError,
    refetch,
  } = useGetAllattendanceRequestQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  const attendancerequest =
    attendancerequestData?.data?.length && !isError
      ? attendancerequestData.data
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
      <HeadingComp heading="Attendance Request" iconToShow={[]} />
      <CustomTable1
        {...{
          isLoading: isLoading,
          datas: attendancerequest,
          columns: [
            "Sl.No",
            "Employee",
            "Location",
            "Office",
            "Date",
            "Request Time",
          ],
        }}
      />
    </div>
  );
};

export default AttendanceReq;
