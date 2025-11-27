import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import dayjs from "@/utils/dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CommonInput } from "@/components/Common/CommonInput";
import { useLeaveReportQuery } from "@/app/rtkQueries/leaveApi";
import { useExcelExport } from "@/hooks/useExcelDownload";

const INITIAL_DETAILS = {
  fromDate: dayjs().format("YYYY-MM-DD"),
  toDate: dayjs().format("YYYY-MM-DD"),
};

const EXCEL_COLUMNS = [
  "Employee Name",
  "Office",
  "Shift Name",
  "Shift From",
  "Shift To",
  "Absent Date",
];

const AbsenteRep = () => {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const {
    data: absenteReportData,
    isFetching: isLoading,
    isError,
    refetch,
  } = useLeaveReportQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
    fromDate: details.fromDate,
    toDate: details.toDate,
  });

  const absenteReports =
    absenteReportData?.data?.length && !isError
      ? absenteReportData.data
          .filter((data) =>
            Object.values(data)
              ?.join(" ")
              ?.toLowerCase()
              ?.includes(searchText.toLowerCase())
          )
          .map((data, index) => ({
            other: {
              ...data,
            },
            excelData: {
              employee: data.fullName,
              officeName: data.officeName,
              shiftName: data.shiftName || "-",
              shiftFrom: data.shiftFrom
                ? dayjs(data.shiftFrom, "HH:mm:ss").format("HH:mm A")
                : "-",
              shiftTo: data.shiftTo
                ? dayjs(data.shiftTo, "HH:mm:ss").format("HH:mm A")
                : "-",
              absentDate: dayjs(data.missingDate).format("DD MMM YYYY"),
            },
            tableData: {
              sl: index + 1,
              employee: data.fullName,
              officeName: data.officeName,
              shiftName: data.shiftName || "-",
              shiftFrom: data.shiftFrom
                ? dayjs(data.shiftFrom, "HH:mm:ss").format("HH:mm A")
                : "-",
              shiftTo: data.shiftTo
                ? dayjs(data.shiftTo, "HH:mm:ss").format("HH:mm A")
                : "-",
              absentDate: dayjs(data.missingDate).format("DD MMM YYYY"),
            },
          }))
      : [];

  const handleDateChange = (date) => {
    const fromDate = date ? dayjs(date[0]).format("DD-MM-YYYY") : undefined;
    const toDate = date ? dayjs(date[1]).format("DD-MM-YYYY") : undefined;
    setDetails((prev) => ({
      ...prev,
      fromDate: fromDate,
      toDate: toDate,
    }));
  };

  const { DownloadButton } = useExcelExport(
    EXCEL_COLUMNS,
    absenteReports.map((item) => item.excelData),
    {
      fileName: "AbsentReport",
      sheetName: "AbsentReport",
      buttonText: "Download Report",
    }
  );

  return (
    <div>
      <HeadingComp
        heading="Absent Report"
        iconToShow={[]}
        refetch={refetch}
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex gap-5 justify-between mb-3">
        <div className="flex gap-5">
          <CommonInput
            type="daterange"
            labelContainerClass="w-fit"
            containerClass="flex-row items-center w-fit"
            labelClass="text-nowrap"
            label="Date Range"
            onChange={handleDateChange}
            rangeDivider="to"
            name="date"
            value={[details.fromDate, details.toDate]}
          />
        </div>
        <DownloadButton />
      </div>
      <CustomTable1
        {...{
          isLoading: isLoading,
          datas: absenteReports,
          containerClass: "max-h-[calc(100vh-13.5rem)]",
          columns: [
            "Sl.No",
            "Employee Name",
            "Office",
            "Shift Name",
            "Shift From",
            "Shift To",
            "Absent Date",
          ],
        }}
      />
    </div>
  );
};

export default AbsenteRep;
