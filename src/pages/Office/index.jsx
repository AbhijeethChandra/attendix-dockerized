import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateOffice } from "./CreateOffice";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { skipToken } from "@reduxjs/toolkit/query";
import { twMerge } from "tailwind-merge";
import {
  useGetAllOfficeQuery,
  useUpdateStatusOfficeMutation,
} from "@/app/features/office/officeApi";

const Office = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [searchText, setSearchText] = useState("");

  const onClose = () => setIsOpen(false);

  const {
    data: officesData,
    isLoading,
    isError,
    refetch,
  } = useGetAllOfficeQuery(user.tenant_id ?? skipToken);

  const [updateStatusApi, updateStatusResult] = useUpdateStatusOfficeMutation();

  const offices =
    officesData?.data.length && !isError
      ? officesData.data
          .filter((office) =>
            office.officeName.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((data, index) => ({
            other: {
              ...data,
            },
            tableData: {
              sl: index + 1,
              sectorName: data.sectorName,
              officeName: data.officeName,
              officeType: data.officeType,
              parentOffice: data.parentOfficeName,
              address: data.address,
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
      console.log("Error updating office status:", err);
    }
  };

  return (
    <div>
      <HeadingComp
        heading="Office Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Office"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: offices,
          columns: [
            "Sl.No",
            "Sector",
            "Name",
            "Office Type",
            "Parent Office",
            "Adderss",
            "Status",
            "Action",
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
      <CreateOffice {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default Office;
