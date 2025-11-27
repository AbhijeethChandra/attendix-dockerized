import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import dayjs from "@/utils/dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CommonInput } from "@/components/Common/CommonInput";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useAttendanceSummaryReportQuery } from "@/app/rtkQueries/attendanceApi";
import { useExcelExport } from "@/hooks/useExcelDownload";

const INITIAL_DETAILS = {
  fromDate: dayjs().format("YYYY-MM-DD"),
  toDate: dayjs().format("YYYY-MM-DD"),
};

const EXCEL_COLUMNS = [
  "Employee Name",
  "Office",
  "Department",
  "Shift Name",
  "Shift From",
  "Shift To",
  "Total Working Days",
  "Total Present Days",
  "Total Absent Days",
  "Total Late Days",
];

const SummaryReport = () => {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const {
    data: SummaryReportData,
    isFetching: isLoading,
    isError,
    refetch,
  } = useAttendanceSummaryReportQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
    fromDate: details.fromDate,
    toDate: details.toDate,
  });

  const SummaryReports =
    SummaryReportData?.data?.length && !isError
      ? SummaryReportData.data
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
              staffName: data.staffName,
              officeName: data.officeName,
              departmentName: data.departmentName,
              shiftName: data.shiftName,
              shiftFrom: data.shiftFrom,
              shiftTo: data.shiftTo,
              totalWorkingDays: data.totalWorkingDays,
              totalPresentDays: data.presentDays,
              totalAbsentDays: data.absentDays,
              totalLeaveDays: data.totalLeaveDays,
              totalLateDays: data.lateDays,
            },
            tableData: {
              sl: index + 1,
              staffName: data.staffName,
              officeName: data.officeName,
              departmentName: data.departmentName,
              shiftName: data.shiftName,
              shiftFrom: data.shiftFrom,
              shiftTo: data.shiftTo,
              totalWorkingDays: data.totalWorkingDays,
              totalPresentDays: data.presentDays,
              totalAbsentDays: data.absentDays,
              totalLeaveDays: data.totalLeaveDays,
              totalLateDays: data.lateDays,
            },
          }))
      : [];

  const { DownloadButton } = useExcelExport(
    EXCEL_COLUMNS,
    SummaryReports.map((item) => item.excelData),
    {
      fileName: "SummaryReport",
      sheetName: "SummaryReport",
      buttonText: "Download Report",
    }
  );

  const handleDateChange = (date) => {
    const fromDate = date ? dayjs(date[0]).format("DD-MM-YYYY") : undefined;
    const toDate = date ? dayjs(date[1]).format("DD-MM-YYYY") : undefined;
    setDetails((prev) => ({
      ...prev,
      fromDate: fromDate,
      toDate: toDate,
    }));
  };

  return (
    <div>
      <HeadingComp
        heading="Summary Report"
        iconToShow={[]}
        refetch={refetch}
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex gap-5 justify-between mb-3">
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
        <DownloadButton />
      </div>
      <CustomTable1
        {...{
          isLoading: isLoading,
          datas: SummaryReports,
          containerClass: "max-h-[calc(100vh-13.5rem)]",
          columns: [
            "Sl.No",
            "Employee Name",
            "Office",
            "Department",
            "Shift Name",
            "Shift From",
            "Shift To",
            "Total Working Days",
            "Total Present Days",
            "Total Absent Days",
            "Total Leave Days",
            "Total Late Days",
          ],
        }}
      />
    </div>
  );
};

export default SummaryReport;
