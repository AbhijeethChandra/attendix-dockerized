import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { skipToken } from "@reduxjs/toolkit/query";
import { twMerge } from "tailwind-merge";
import { CreateShift } from "./CreateShift";
import {
  useGetAllOfficeShiftsQuery,
  useUpdateStatusShiftMutation,
} from "@/app/rtkQueries/shiftApi";

const Shift = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const onClose = () => setIsOpen(false);

  const {
    data: shiftsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllOfficeShiftsQuery(
    { tenantId: user.tenant_id, officeId: office?.id } ?? skipToken
  );

  const [updateStatusApi, updateStatusResult] = useUpdateStatusShiftMutation();

  const shifts =
    shiftsData?.data.length && !isError
      ? shiftsData.data
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
              shiftName: data.shiftName,
              shiftFrom: data.shiftFrom,
              shiftTo: data.shiftTo,
              shiftType: data.shiftType,
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
      console.log("Error updating shift status:", err);
    }
  };

  return (
    <div>
      <HeadingComp
        refetch={refetch}
        heading="Shift Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Shift"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: shifts,
          columns: [
            "Sl.No",
            "Shift Name",
            "Shift From",
            "Shift To",
            "Shift Type",
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
      <CreateShift {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default Shift;
