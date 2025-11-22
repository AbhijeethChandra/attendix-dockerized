import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateEmployee } from "./CreateEmployee";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { skipToken } from "@reduxjs/toolkit/query";
import { twMerge } from "tailwind-merge";
import {
  useGetOfficeEmployeesQuery,
  useUpdateStatusEmployeeMutation,
} from "@/app/features/employee/employeeApi";

const Employee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);
  const [searchText, setSearchText] = useState("");

  const onClose = () => setIsOpen(false);

  const {
    data: employeesData,
    isLoading,
    isError,
    refetch,
  } = useGetOfficeEmployeesQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office.id ?? skipToken,
  });

  const [updateStatusApi, updateStatusResult] =
    useUpdateStatusEmployeeMutation();

  const employees =
    employeesData?.data.length && !isError
      ? employeesData.data
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
              fullName: data.fullName,
              roleName: data.roleName,
              phoneNumber: data.phoneNumber,
              email: data.email,
              department: data.department,
              reportingStaffName: data.reportingStaffName,
              outsideClockin: data.outsideClockin ? "ENABLED" : "DISABLED",
              multipleClockIn: data.multipleClockIn ? "ENABLED" : "DISABLED",
              geoSense: data.geoSense ? "ENABLED" : "DISABLED",
            },
          }))
      : [];

  const handleStatusUpdate = async (data) => {
    const updatedStatus = data.active === "Y" ? "N" : "Y";
    const submitData = {
      id: data.id,
      active: updatedStatus,
      tenantId: user.tenant_id,
    };
    try {
      await updateStatusApi(submitData);
      refetch();
    } catch (err) {
      console.log("Error updating employee status:", err);
    }
  };

  return (
    <div>
      <HeadingComp
        heading="Employee Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Employee"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: employees,
          columns: [
            "Sl.No",
            "Name",
            "Role",
            "Phone",
            "Mail",
            "Department",
            "Reporting Staff",
            "Outside Punch Status",
            "Multiple ClockIn",
            "Geo Sense",
            "Status",
            "Actions",
          ],
          actions: [
            [
              ({ data }) => {
                const isActive = data.active === "Y";
                return (
                  <button
                    disabled={updateStatusResult.isLoading}
                    onClick={() => handleStatusUpdate(data)}
                    className={twMerge(
                      "button-1 rounded-md px-2 py-0.5 button-inactive text-md font-medium",
                      isActive && "button-active"
                    )}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </button>
                );
              },
            ],
            [
              ({ data }) => (
                <MdEdit
                  onClick={() => setIsOpen(data)}
                  className="cursor-pointer size-6 text-[var(--color-icon-2)]"
                />
              ),
            ],
          ],
        }}
      />
      <CreateEmployee {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default Employee;
