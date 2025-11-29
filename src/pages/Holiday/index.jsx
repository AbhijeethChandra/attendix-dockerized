import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { CreateHoliday } from "./CreateHoliday";
import { useGetAllHolidayQuery } from "@/app/rtkQueries/holidayApi";
import { useUpdateHolidayMutation } from "@/app/rtkQueries/holidayApi";
import { twMerge } from "tailwind-merge";
import dayjs from "@/utils/dayjs";

const Holiday = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState({ name: "", order: "ASC", field: "" });

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const onClose = () => setIsOpen(false);

  const {
    data: holidayData,
    isLoading,
    isError,
    refetch,
  } = useGetAllHolidayQuery({
    tenantId: user.tenant_id,
    officeId: office?.id,
  });

  const [updateStatusApi, updateStatusApiResult] = useUpdateHolidayMutation();

  const holidays =
    holidayData?.data.length && !isError
      ? holidayData.data
          .map((data, index) => ({
            other: {
              ...data,
            },
            tableData: {
              sl: index + 1,
              holidayName: data.holidayName,
              holidayDate: dayjs(data.holidayDate).format("DD-MM-YYYY"),
              isGlobal: data.isGlobal ? "ENABLED" : "DISABLED",
              isOptional: data.isOptional ? "ENABLED" : "DISABLED",
            },
          }))
          .filter((data) =>
            Object.values(data.tableData)
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

  const handleSectorStatus = async (data) => {
    const updatedStatus = data.active === "Y" ? "N" : "Y";
    const submitData = {
      id: data.id,
      active: updatedStatus,
      tenantId: user.tenant_id,
      officeId: data.officeId,
      holidayDate: data.holidayDate,
      holidayName: data.holidayName,
      isOptional: data.isOptional,
      isGlobal: data.isGlobal,
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
        refetch={refetch}
        heading="Holiday"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Holiday"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading: isLoading,
          errorMessage:
            !isError && office?.id > -1 ? null : "Please select an office",
          datas: holidays,
          sort: sort,
          setSort: setSort,
          columns: [
            "Sl.No",
            "Holiday Name",
            "Holiday Date",
            "Global Holiday",
            "Optional Holiday",
            "Status",
            "Actions",
          ],
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
      <CreateHoliday {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default Holiday;
