import { useGetAllDeviceInfoQuery } from "@/app/rtkQueries/deviceinfoApi";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSelector } from "react-redux";

const DeviceIn = () => {
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState({ name: "", order: "ASC", field: "" });

  const office = useSelector((state) => state.auth.office);
  const user = useSelector((state) => state.auth.user);

  //queries
  const {
    data: deviceinfoData,
    isLoading,
    isError,
    refetch,
  } = useGetAllDeviceInfoQuery({
    tenantId: user.tenant_id,
    officeId: office?.id,
  });

  const deviceinfo =
    deviceinfoData?.data?.length && !isError
      ? deviceinfoData.data
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
          .filter((data) =>
            Object.values(data.tableData)
              ?.join(" ")
              ?.toLowerCase()
              ?.includes(searchText.toLowerCase())
          )
          .sort((a, b) => {
            if (sort.name && sort.field) {
              const fieldA = a.tableData
                ? a.tableData[sort.field]
                : a[sort.field];
              const fieldB = b.tableData
                ? b.tableData[sort.field]
                : b[sort.field];
              if (fieldA > fieldB) return sort.order === "ASC" ? -1 : 1;
              if (fieldA < fieldB) return sort.order === "ASC" ? 1 : -1;
              return 0;
            }
            return 0;
          })
      : [];
  return (
    <div>
      <HeadingComp
        refetch={refetch}
        heading="Device Info"
        iconToShow={[]}
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading: isLoading,
          sort: sort,
          setSort: setSort,
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
