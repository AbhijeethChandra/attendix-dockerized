import {
  useAttendanceStatusUpdateMutation,
  useGetAllattendanceRequestQuery,
} from "@/app/rtkQueries/attendanceApi";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AttendanceReject } from "./AttendanceReject";
import dayjs, { dayjsUtc } from "@/utils/dayjs";

const AttendanceReq = () => {
  const [searchText, setSearchText] = useState("");
  const [showReject, setShowReject] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);
  const [sort, setSort] = useState({ name: "", order: "ASC", field: "" });

  const {
    data: attendancerequestData,
    isLoading,
    isError,
    refetch,
  } = useGetAllattendanceRequestQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  const [attendanceStatusUpdate, attendanceStatusUpdateRes] =
    useAttendanceStatusUpdateMutation();

  const attendancerequest =
    attendancerequestData?.data?.length && !isError
      ? attendancerequestData.data
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
              employee: data.employee,
              locationText: data.locationText,
              officeName: data.officeName,
              createdAt: dayjs(data.createdAt|| null).format("DD MMM YYYY"),
              requestTime: dayjsUtc(data.punchTime|| null).format("hh:mm A"),
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

  const handleSubmit = async (data) => {
    try {
      const submitData = {
        userId: user.id,
        ...data,
      };

      await attendanceStatusUpdate(submitData).unwrap();
      setShowReject(false);
      refetch();
      toast.success(`Attendance request processed successfully`);
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  return (
    <div>
      <HeadingComp
        refetch={refetch}
        heading="Attendance Request"
        iconToShow={[]}
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading: isLoading,
          sort: sort,
          setSort: setSort,
          datas: attendancerequest,
          columns: [
            "Sl.No",
            "Employee",
            "Location",
            "Office",
            "Date",
            "Request Time",
            "Actions",
          ],

          actions: [
            [
              ({ data }) => (
                <div className="flex gap-2 ">
                  <button
                    onClick={() =>
                      setShowReject({ id: data.id, action: "REJECT" })
                    }
                    className="button-1 button-inactive px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      handleSubmit({ requestId: data.id, action: "APPROVE" })
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
      <AttendanceReject
        {...{
          isOpen: showReject,
          onClose: () => setShowReject(false),
          isLoading: attendanceStatusUpdateRes.isLoading,
          onSubmit: handleSubmit,
        }}
      />
    </div>
  );
};

export default AttendanceReq;
