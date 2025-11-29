import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import dayjs from "@/utils/dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CommonInput } from "@/components/Common/CommonInput";
import { useLeaveDayviseReportQuery } from "@/app/rtkQueries/leaveApi";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useExcelExport } from "@/hooks/useExcelDownload";

const INITIAL_DETAILS = {
  fromDate: dayjs().format("YYYY-MM-DD"),
  toDate: dayjs().format("YYYY-MM-DD"),
};

const EXCEL_COLUMNS = [
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
  "Decision Reason",
];

const LeaveRep = () => {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState({ name: "", order: "ASC", field: "" });

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const {
    data: leaveReportData,
    isFetching: isLoading,
    isError,
    refetch,
  } = useLeaveDayviseReportQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
    fromDate: details.fromDate,
    toDate: details.toDate,
  });

  const leaveReports =
    leaveReportData?.data?.length && !isError
      ? leaveReportData.data
          .map((data, index) => ({
            other: {
              ...data,
            },
            excelData: {
              status: data.status,
              employee: data.employee,
              officeName: data.officeName,
              leaveCategoryName: data.leaveCategoryName,
              leaveType: data.leaveType,
              session: data.session,
              requestReason: data.requestReason,
              requestDate: dayjs(data.requestDate).format("DD MMM YYYY"),
              approvedDate: data.approvedDate
                ? dayjs(data.approvedDate).format("DD MMM YYYY")
                : "-",
              appliedDate: dayjs(data.appliedDate).format("DD MMM YYYY"),
              decisionReason: data.decisionReason,
            },
            tableData: {
              sl: index + 1,
              status:
                data.status === "APPROVED" ? (
                  <CheckCircleIcon className="size-5 text-[var(--color-icon-success)]" />
                ) : (
                  <CheckCircleIcon className="size-5 text-[var(--color-icon-error)]" />
                ),
              employee: data.employee,
              officeName: data.officeName,
              leaveCategoryName: data.leaveCategoryName,
              leaveType: data.leaveType,
              session: data.session,
              requestReason: data.requestReason,
              requestDate: dayjs(data.requestDate).format("DD MMM YYYY"),
              approvedDate: data.approvedDate
                ? dayjs(data.approvedDate).format("DD MMM YYYY")
                : "-",
              appliedDate: dayjs(data.appliedDate).format("DD MMM YYYY"),
              decisionReason: data.decisionReason,
            },
          }))
          .filter((data) =>
            Object.values(data.excelData)
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

  const { DownloadButton } = useExcelExport(
    EXCEL_COLUMNS,
    leaveReports.map((item) => item.excelData),
    {
      fileName: "LeaveReport",
      sheetName: "LeaveReport",
      buttonText: "Download Report",
    }
  );

  const handleDateChange = (date) => {
    try {
      const fromDate =
        date.length > 0 ? dayjs(date[0]).format("YYYY-MM-DD") : undefined;
      const toDate = date ? dayjs(date[1]).format("YYYY-MM-DD") : undefined;

      console.log(toDate, fromDate);
      setDetails((prev) => ({
        ...prev,
        fromDate: fromDate,
        toDate: toDate,
      }));
    } catch (err) {
      console.log("Date parse error:", err);
    }
  };

  return (
    <div>
      <HeadingComp
        heading="Leave Report"
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
          datas: leaveReports,
          sort: sort,
          setSort: setSort,
          containerClass: "max-h-[calc(100vh-13.5rem)]",
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
            "Decision Reason",
          ],
        }}
      />
    </div>
  );
};

export default LeaveRep;
