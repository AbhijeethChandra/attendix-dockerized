import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { CreateShiftAss } from "./CreateShiftAssignment";
import {
  useGetShiftAssignByStaffQuery,
  useGetShiftAssignQuery,
} from "@/app/rtkQueries/shiftAssignApi";

const ShiftAss = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const onClose = () => setIsOpen(false);

  const {
    data: shiftAssignData,
    isLoading,
    isError,
    refetch,
  } = useGetShiftAssignQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
    shiftId: 0,
  });

  const shiftAssign =
    shiftAssignData?.data.length && !isError
      ? shiftAssignData.data
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
              effectiveFrom: data.effectiveFrom,
              effectiveTo: data.effectiveTo,
            },
          }))
      : [];

  return (
    <div>
      <HeadingComp
        refetch={refetch}
        heading="Shift Assignment"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Assign Shift Assignment"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading: isLoading,
          errorMessage: office?.id ? null : "Please select an office",
          datas: shiftAssign,
          columns: [
            "Sl.No",
            "Office",
            "Employee",
            "Shift",
            "Effective From",
            "Effective To",
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
      <CreateShiftAss {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default ShiftAss;
