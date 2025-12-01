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
import dayJs from "@/utils/dayjs";

const ShiftAss = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);
  const [sort, setSort] = useState({ name: "", order: "ASC", field: "" });

  const onClose = () => setIsOpen(false);

  const {
    data: shiftAssignData,
    isLoading,
    isError,
    refetch,
  } = useGetShiftAssignQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  const shiftAssign =
    shiftAssignData?.data.length && !isError
      ? shiftAssignData.data
          .map((data, index) => ({
            other: {
              ...data,
            },
            tableData: {
              sl: index + 1,
              officeName: data.officeName,
              staffName: data.staffName,
              shiftName: data.shiftName,
              effectiveFrom: data.effectiveFrom
                ? dayJs(data.effectiveFrom).format("DD-MM-YYYY")
                : "-",
              effectiveTo: data.effectiveTo
                ? dayJs(data.effectiveTo).format("DD-MM-YYYY")
                : "-",
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
          sort: sort,
          setSort: setSort,
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
