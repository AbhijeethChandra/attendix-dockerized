import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateOfficeAllocation } from "./CreateOfficeAllocation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetEmployeesOfficesQuery } from "@/app/rtkQueries/employeeApi";

const OfficeAllocationAllocation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState({ name: "", order: "ASC", field: "" });

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const onClose = () => setIsOpen(false);

  const {
    data: officeAllocationsData,
    isLoading,
    isError,
    refetch,
  } = useGetEmployeesOfficesQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  const officeAllocations =
    officeAllocationsData?.data.length && !isError
      ? officeAllocationsData.data
          .filter((data) =>
            Object.values(data)
              ?.join(" ")
              ?.toLowerCase()
              ?.includes(searchText.toLowerCase())
          )
          .map((data, index) => ({
            other: {
              ...data,
              id: data.staffId,
            },
            tableData: {
              sl: index + 1,
              fullName: data.fullName,
              phoneNumber: data.phoneNumber,
              email: data.email,
              tenantName: data.tenantName,
              offices: Array.isArray(data?.offices)
                ? data.offices.map((office) => office.officeName).join(", ")
                : "",
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

  return (
    <div>
      <HeadingComp
        refetch={refetch}
        heading="Office Allocation"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Office Allocation"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: officeAllocations,
          sort: sort,
          setSort: setSort,
          columns: ["Sl.No", "Name", "Phone", "Mail", "Tenant Name", "Offices"],
          // actions: [
          //   [
          //     ({ data }) => (
          //       <MdEdit
          //         onClick={() => setIsOpen(data)}
          //         className="cursor-pointer size-6 text-[var(--color-icon-2)]"
          //       />
          //     ),
          //   ],
          // ],
        }}
      />
      <CreateOfficeAllocation {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default OfficeAllocationAllocation;
