import { useGetAllEmployeeWiseReportQuery } from "@/app/rtkQueries/employeewisereportApi";
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
import { EyeIcon } from "@heroicons/react/16/solid";
import { ViewEmployeeWise } from "./ViewEmployeeWiseReport";

const INITIAL_DETAILS = {
  fromDate: dayjs().format("YYYY-MM-DD"),
  toDate: dayjs().format("YYYY-MM-DD"),
  departmentId: undefined,
};

const EmployeeWiseRep = () => {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [searchText, setSearchText] = useState("");
  const [viewDayWise, setViewDayWise] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const { data: departmentsData } = useGetActiveDepartmentsQuery(
    user.tenant_id ?? skipToken
  );

  const {
    data: employeewisereportData,
    isLoading,
    isError,
    refetch,
  } = useGetAllEmployeeWiseReportQuery(
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

  const employeewisereport =
    employeewisereportData?.data?.length && !isError
      ? employeewisereportData.data
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
              view: (
                <EyeIcon
                  onClick={() => setViewDayWise(data)}
                  className="size-5 text-[var(--color-header)] cursor-pointer"
                />
              ),
              departmentName: data.departmentName,
              enteredDt: dayjs(data.enteredDt, "DD-MM-YYYY").format(
                "DD MMM YYYY"
              ),
              checkInTime: (
                <div className="flex gap-2 flex-nowrap">
                  <IoMdLogIn className="size-5 text-[var(--color-icon-success)]" />
                  {dayjs(data.checkInTime).format("DD MMM YYYY")}
                </div>
              ),
              checkOutTime: (
                <div className="flex gap-2 flex-nowrap">
                  <IoMdLogOut className="size-5 text-[var(--color-icon-error)]" />
                  {dayjs(data.checkOutTime).format("DD MMM YYYY")}
                </div>
              ),
              workingHours: data.workingHours,
              breaks: data.breaks.length ? (
                <div className="flex gap-2 flex-wrap max-w-[300px] max-h-[80px] overflow-x-auto">
                  {data.breaks?.map((brk, index) => (
                    <div
                      key={index}
                      className="flex gap-2 flex-nowrap border border-[var(--color-border-1)] rounded-md p-2"
                    >
                      <div className="flex gap-2 flex-nowrap">
                        <IoMdLogOut className="size-5 text-[var(--color-icon-error)]" />
                        {dayjs(brk.breakInTime).format("HH:mm A")}
                      </div>
                      <div className="flex gap-2 flex-nowrap">
                        <IoMdLogIn className="size-5 text-[var(--color-icon-success)]" />
                        {dayjs(brk.breakOutTime).format("HH:mm A")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                "No breaks"
              ),
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
        refetch={refetch}
        heading="Employee Wise Report"
        iconToShow={[]}
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
          datas: employeewisereport,
          containerClass: "max-h-[calc(100vh-15rem)]",
          columns: [
            "Sl.No",
            "Employee",
            "View",
            "Department",
            "Date",
            "Clock-In",
            "Clock-Out",
            "Working Hours",
            "Breaks",
          ],
        }}
      />
      <ViewEmployeeWise
        {...{
          isOpen: viewDayWise,
          onClose: () => setViewDayWise(false),
          data: viewDayWise,
        }}
      />
    </div>
  );
};

export default EmployeeWiseRep;
