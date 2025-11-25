import { useGetAllDeviceInfoQuery } from "@/app/rtkQueries/deviceinfoApi";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSelector } from "react-redux";

const DeviceIn = () => {
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const {
    data: deviceinfoData,
    isLoading,
    isError,
    refetch,
  } = useGetAllDeviceInfoQuery({
    tenantId: user.tenant_id,
  });

  const deviceinfo =
    deviceinfoData?.data?.length && !isError
      ? deviceinfoData.data
          .filter((data) =>
            data?.officeName?.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((data, index) => ({
            other: {
              ...data,
            },
            tableData: {
              sl: index + 1,
              username: data.username,
              deviceInfo: data.deviceInfo,
              appVersion: data.appVersion,
              officeName: data.officeName,
            },
          }))
      : [];
  return (
    <div>
      <HeadingComp refetch={refetch} heading="Device Info" iconToShow={[]} />
      <CustomTable1
        {...{
          isLoading: isLoading,
          datas: deviceinfo,
          columns: [
            "Sl.No",
            "Employee Name",
            "Device Info",
            "App Version",
            "Office Name",
          ],
        }}
      />
    </div>
  );
};

export default DeviceIn;
