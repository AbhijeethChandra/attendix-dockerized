import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { CreateShiftOver } from "./CreateShiftOverride";
import { useGetAllShiftOverrideQuery } from "@/app/rtkQueries/shiftOverrideApi";

const ShiftOver = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const onClose = () => setIsOpen(false);

  const {
    data: shiftOverridesData,
    isLoading,
    isError,
    refetch,
  } = useGetAllShiftOverrideQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  const shiftOverrides =
    shiftOverridesData?.data.length && !isError
      ? shiftOverridesData.data
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
              officeName: data.officeName,
              staffName: data.staffName,
              shiftName: data.shiftName,
              overrideDate: data.overrideDate,
              reason: data.reason,
            },
          }))
      : [];

  return (
    <div>
      <HeadingComp
        refetch={refetch}
        heading="Shift Override"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Assign Shift Override"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading: isLoading,
          errorMessage: office?.id ? null : "Please select an office",
          datas: shiftOverrides,
          columns: [
            "Sl.No",
            "Office",
            "Employee",
            "Shift",
            "Override Date",
            "Reason",
            "Action",
          ],
          actions: [
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
      <CreateShiftOver {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default ShiftOver;
