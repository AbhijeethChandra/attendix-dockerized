import { useState } from "react";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { MdEdit } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { CreateLeaveType } from "./CreateLeaveType";
import {
  useGetOfficeLeaveQuery,
  useUpdateStatusLeaveMutation,
} from "@/app/rtkQueries/leave";

const LeaveType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState({ name: "", order: "ASC", field: "" });

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const {
    data: leaveData,
    isLoading,
    isError,
    refetch,
  } = useGetOfficeLeaveQuery(
    { tenantId: user.tenant_id, officeId: office?.id } ?? skipToken
  );

  const [updateStatusApi, updateStatusResult] = useUpdateStatusLeaveMutation();

  const leaves =
    leaveData?.data.length && !isError
      ? leaveData.data
          .filter((data) =>
            Object.values(data)
              ?.join(" ")
              ?.toLowerCase()
              ?.includes(searchText.toLowerCase())
          )
          .map((data, index) => ({
            other: { ...data },
            tableData: {
              sl: index + 1,
              name: data.name,
              description: data.description,
            },
          }))
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

  const onClose = () => setIsOpen(false);

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
        refetch={refetch}
        heading="Leave Type"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: leaves,
          sort: sort,
          setSort: setSort,
          columns: ["Sl.No", "LeaveType", "Description", "Status", "Actions"],
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
      <CreateLeaveType {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default LeaveType;
