import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateSector } from "./CreateSector";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { skipToken } from "@reduxjs/toolkit/query";
import { twMerge } from "tailwind-merge";
import {
  useGetAllSectorQuery,
  useUpdateStatusSectorMutation,
} from "@/app/rtkQueries/sectorApi";

const Sector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [searchText, setSearchText] = useState("");

  const onClose = () => setIsOpen(false);

  const {
    data: sectorsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllSectorQuery(user.tenant_id ?? skipToken);

  const [updateStatusApi, updateStatusApiResult] =
    useUpdateStatusSectorMutation();

  const sectors = useCallback(() => {
    if (sectorsData?.data.length && !isError) {
      return sectorsData.data
        .filter((data) =>
          Object.values(data)
            ?.join(" ")
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase())
        )
        .map((data, index) => ({
          other: { ...data },
          tableData: { sl: index + 1, sectorName: data.sectorName },
        }));
    } else return [];
  }, [sectorsData, searchText, isError]);

  const handleSectorStatus = async (data) => {
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
      console.log("Error updating sector status:", err);
    }
  };

  return (
    <div>
      <HeadingComp
        heading="Sector Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Sector"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: sectors(),
          columns: ["Sl.No", "Sector Name", "Status", "Actions"],
          actions: [
            [
              ({ data }) => {
                const isActive = data.active === "Y";
                return (
                  <button
                    disabled={updateStatusApiResult.isLoading}
                    onClick={() => handleSectorStatus(data)}
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
      <CreateSector {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default Sector;
