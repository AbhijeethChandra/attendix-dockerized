import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LeaveReject } from "./LeaveReject";
import {
  useGetAllLeaveRequestQuery,
  useLeaveRequestStatusUpdateMutation,
} from "@/app/rtkQueries/leaveRequestApi";
import dayJs from "@/utils/dayjs";

const LeaveReq = () => {
  const [searchText, setSearchText] = useState("");
  const [showReject, setShowReject] = useState(false);
  const [sort, setSort] = useState({ name: "", order: "ASC", field: "" });

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const {
    data: leaveRequestData,
    isLoading,
    isError,
    refetch,
  } = useGetAllLeaveRequestQuery(
    user.tenant_id
      ? {
          tenantId: user.tenant_id,
          officeId: office?.id,
        }
      : skipToken
  );

  const [leaveRequestStatusUpdate, leaveRequestStatusUpdateRes] =
    useLeaveRequestStatusUpdateMutation();

  const leaveRequest =
    leaveRequestData?.data?.length && !isError
      ? leaveRequestData.data
          .map((data, index) => ({
            other: {
              ...data,
            },
            tableData: {
              sl: index + 1,
              employee: data.employee,
              officeName: data.officeName,
              leaveCategoryName: data.leaveCategoryName,
              leaveType: data.leaveType,
              requestDate: dayJs(data.requestDate).format("DD MMM YYYY"),
              createdDate: dayJs(data.createdDate).format("DD MMM YYYY"),
              requestReason: data.requestReason,
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

  const handleSubmit = async (data) => {
    try {
      console.log({ data });
      const submitData = {
        userId: user.id,
        ...data,
      };

      await leaveRequestStatusUpdate(submitData).unwrap();
      setShowReject(false);
      refetch();
      toast.success(`Leave request processed successfully`);
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  return (
    <div>
      <HeadingComp
        heading="Leave Request"
        iconToShow={[]}
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
        refetch={refetch}
      />
      <CustomTable1
        {...{
          isLoading: isLoading,
          sort: sort,
          setSort: setSort,
          datas: leaveRequest,
          columns: [
            "Sl.No",
            "Employee Name",
            "Office",
            "Leave Category",
            "Leave Type",
            "Request Date",
            "Apllied Date",
            "Reason",
            "Actions",
          ],
          actions: [
            [
              ({ data }) => (
                <div className="flex gap-2 ">
                  <button
                    onClick={() =>
                      setShowReject({ id: data.id, action: "REJECTED" })
                    }
                    className="button-1 button-inactive px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      handleSubmit({
                        remarks: "",
                        requestId: data.id,
                        action: "APPROVED",
                      })
                    }
                    className="button-1 button-active px-3 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                </div>
              ),
            ],
          ],
        }}
      />
      <LeaveReject
        {...{
          isOpen: showReject,
          onClose: () => setShowReject(false),
          isLoading: leaveRequestStatusUpdateRes.isLoading,
          onSubmit: handleSubmit,
        }}
      />
    </div>
  );
};

export default LeaveReq;
