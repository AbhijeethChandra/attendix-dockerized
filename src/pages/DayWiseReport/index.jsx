import { useGetAllDayWiseReportQuery } from "@/app/rtkQueries/daywisereportApi";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { SearchBar } from "@/components/Common/SearchBar";
import { CommonInput } from "@/components/Common/CommonInput";
import { useGetActiveDepartmentsQuery } from "@/app/rtkQueries/departmentApi";

const INITIAL_DETAILS = {
  fromDate: dayjs().format("YYYY-MM-DD"),
  toDate: dayjs().format("YYYY-MM-DD"),
  departmentId: undefined,
};

const DayWiseRep = () => {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const { data: departmentsData } = useGetActiveDepartmentsQuery(
    user.tenant_id ?? skipToken
  );

  const {
    data: daywiseReportData,
    isFetching: isLoading,
    isError,
    refetch,
  } = useGetAllDayWiseReportQuery(
    details.departmentId === undefined
      ? skipToken
      : {
          tenantId: user.tenant_id ?? skipToken,
          officeId: office?.id ?? skipToken,
          fromDate: details.fromDate,
          toDate: details.toDate,
          departmentId: details.departmentId,
        }
  );

  const departmentOptions = departmentsData?.data
    ? [
        { name: "All", value: 0, id: 0 },
        ...departmentsData.data.map((dept) => ({
          value: dept.id,
          id: dept.id,
          name: dept.deptname,
        })),
      ]
    : [];

  const daywisereport =
    daywiseReportData?.data?.length && !isError
      ? daywiseReportData.data
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
              staffName: data.staffName,
              officeName: data.officeName,
              departmentName: data.departmentName,
              shift: data?.shift?.shiftName,
              shiftFrom: data?.shift?.shiftFrom
                ? dayjs(data?.shift?.shiftFrom, "HH:mm").format("HH:mm A")
                : "-",
              shiftTo: data?.shift?.shiftTo
                ? dayjs(data?.shift?.shiftTo, "HH:mm").format("HH:mm A")
                : "-",
              date: <span className="text-nowrap">{dayjs(data.date).format("DD MMM YYYY")}</span>,
              checkInTime:<span className="text-nowrap">{
                <div className="flex gap-2 flex-nowrap">
                  <IoMdLogIn className="size-5 text-[var(--color-icon-success)]" />
                  {dayjs(data.checkInTime).format("DD MMM YYYY")}
                </div>
            }</span>,
              checkOutTime: <span className="text-nowrap">{
                <div className="flex gap-2 flex-nowrap">
                  <IoMdLogOut className="size-5 text-[var(--color-icon-error)]" />
                  {dayjs(data.checkOutTime).format("DD MMM YYYY")}
                </div>
            }</span>,
              workingHours: data.workingHours,
              breaks: data.breaks.length ? (
                <div className="flex gap-2 flex-wrap max-w-[300px] max-h-[80px] overflow-x-auto">
                  {data.breaks?.map((brk, index) => (
                    <>
                      <div
                        className="rounded-full p-1 bg-[var(--color-header)]/30 items-center text-nowrap flex gap-2 flex-nowrap"
                        key={index}
                      >
                        <IoMdLogOut className="size-5 text-[var(--color-icon-error)]" />
                        {dayjs(brk.breakInTime).format("HH:mm A")}
                      </div>
                      <div
                        className="rounded-full p-1 bg-[var(--color-header)]/30 items-center text-nowrap flex gap-2 flex-nowrap"
                        key={index}
                      >
                        <IoMdLogIn className="size-5 text-[var(--color-icon-success)]" />
                        {dayjs(brk.breakOutTime).format("HH:mm A")}
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                "No breaks"
              ),
              shiftStartMargin: data?.shift?.shiftStartMargin,
              shiftEndMargin: data?.shift?.shiftEndMargin,
            },
          }))
      : [];

  useEffect(() => {
    if (departmentOptions.length > 0 && details.departmentId === undefined) {
      setDetails((prev) => ({
        ...prev,
        departmentId: departmentOptions[0].value,
      }));
    }
  }, [departmentOptions]);

  const handleDateChange = (date) => {
    const fromDate = date ? dayjs(date[0]).format("YYYY-MM-DD") : undefined;
    const toDate = date ? dayjs(date[1]).format("YYYY-MM-DD") : undefined;
    setDetails((prev) => ({
      ...prev,
      fromDate: fromDate,
      toDate: toDate,
    }));
  };

  const handleSelect = (value) => {
    setDetails((prev) => ({
      ...prev,
      departmentId: value,
    }));
  };

  return (
    <div>
      <HeadingComp
        heading="Day Wise Report"
        iconToShow={[]}
        refetch={refetch}
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex gap-5 mb-3">
        <SearchBar
          options={departmentOptions}
          value={details.departmentId}
          onChange={handleSelect}
          placeholder="Select Department"
          className="w-[30%]"
        />
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
      <CustomTable1
        {...{
          isLoading: isLoading,
          datas: daywisereport,
          containerClass: "max-h-[calc(100vh-13.5rem)]",
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
