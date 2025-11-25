import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { CommonInput } from "@/components/Common/CommonInput";
import { useLeaveDayviseReportQuery } from "@/app/rtkQueries/leaveApi";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

const INITIAL_DETAILS = {
  fromDate: dayjs().startOf("month").format("YYYY-MM-DD"),
  toDate: dayjs().endOf("month").format("YYYY-MM-DD"),
};

const LeaveRep = () => {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [searchText, setSearchText] = useState("");

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
            tableData: {
              sl: index + 1,
              status:
                data.status === "APPROVED" ? (
                  <CheckCircleIcon className="size-5 text-[var(--color-icon-success)]" />
                ) : (
                  <CheckCircleIcon className="size-5 text-[var(--color-icon-error)]" />
                ),
              officeName: data.officeName,
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
      : [];

  const handleDateChange = (date) => {
    const fromDate = date ? dayjs(date[0]).format("YYYY-MM-DD") : undefined;
    const toDate = date ? dayjs(date[1]).format("YYYY-MM-DD") : undefined;
    setDetails((prev) => ({
      ...prev,
      fromDate: fromDate,
      toDate: toDate,
    }));
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
      <CommonInput
        type="daterange"
        labelContainerClass="w-fit"
        containerClass="flex-row items-center w-fit mb-3"
        labelClass="text-nowrap"
        label="Date Range"
        onChange={handleDateChange}
        rangeDivider="to"
        name="date"
        value={[details.fromDate, details.toDate]}
      />
      <CustomTable1
        {...{
          isLoading: isLoading,
          datas: leaveReports,
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
