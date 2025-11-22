import { useState } from "react";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateDesignation } from "./CreateDesignation";
import { MdEdit } from "react-icons/md";
import { skipToken } from "@reduxjs/toolkit/query";
import { twMerge } from "tailwind-merge";
import {
  useGetAllDesignationsQuery,
  useUpdateStatusDesignationMutation,
} from "@/app/features/designation/designationApi";
import { useSelector } from "react-redux";

const Designation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [searchText, setSearchText] = useState("");

  const onClose = () => setIsOpen(false);

  const {
    data: designationsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllDesignationsQuery(user.tenant_id ?? skipToken);

  const [updateStatusApi, updateStatusResult] =
    useUpdateStatusDesignationMutation();

  const designations =
    designationsData?.data.length && !isError
      ? designationsData.data
          .filter((data) =>
            data.designame
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((data, index) => ({
            other: {
              ...data,
            },
            tableData: {
              sl: index + 1,
              designame: data.designame,
              department: data.department
            },
          }))
      : [];

  const handleStatusUpdate = async (data) => {
    const updatedStatus = data.active === "Y" ? "N" : "Y";
    const submitData = {
      id: data.id,
      active: updatedStatus,
      // tenantId: user.tenant_id,
    };
    try {
      await updateStatusApi(submitData);
      refetch();
    } catch (err) {
      console.log("Error updating designation status:", err);
    }
  };
  return (
    <div>
      <HeadingComp
        heading="Designation Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Designation"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: designations,
          columns: [
            "Sl.No",
            "Designation Name",
            "Department",
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
      <CreateDesignation {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default Designation;
["Sl.No", "Designation Name", "Department", "Status", "Actions"];
