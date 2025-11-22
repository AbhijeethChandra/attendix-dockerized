import { useCallback, useState } from "react";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateDepartment } from "./CreateDepartment";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetAllDepartmentQuery,
  useUpdateStatusDepartmentMutation,
} from "../../app/features/department/departmentApi";
import { MdEdit } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const Department = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [searchText, setSearchText] = useState("");
  const onClose = () => setIsOpen(false);

  const {
    data: departmentData,
    isLoading,
    isError,
    refetch,
  } = useGetAllDepartmentQuery(user.tenant_id ?? skipToken);

  const [updateStatusApi, updateStatusResult] =
    useUpdateStatusDepartmentMutation();

  const departments = useCallback(() => {
    if (departmentData?.data.length && !isError) {
      return departmentData.data
        .filter((data) =>
          Object.values(data)
              ?.join(" ")
              ?.toLowerCase()
              ?.includes(searchText.toLowerCase())        )
        .map((data, index) => ({
          other: { ...data },
          tableData: { sl: index + 1, deptname: data.deptname },
        }));
    } else return [];
  }, [departmentData, searchText, isError]);

  const handleStatusUpdate = async (data) => {
    const updatedStatus = data.active === "Y" ? "N" : "Y";
    const submitData = {
      id: data.id,
      active: updatedStatus,
      tenantId: user.tenant_id,
    };
    try {
      await updateStatusApi(submitData).unwrap();
      refetch();
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };
  return (
    <div>
      <HeadingComp
        heading="Department Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Department"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: departments(),
          columns: ["Sl.No", "Department Name", "Status", "Actions"],
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
      <CreateDepartment {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default Department;
