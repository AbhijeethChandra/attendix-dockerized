import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateRoleMaster } from "./CreateRoleMaster";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { skipToken } from "@reduxjs/toolkit/query";
import { twMerge } from "tailwind-merge";
import {
  useGetAllRolesQuery,
  // useUpdateRoleMutation,
} from "@/app/rtkQueries/rolemasterApi";

const Role = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [searchText, setSearchText] = useState("");

  const onClose = () => setIsOpen(false);

  const {
    data: roleData,
    isLoading,
    isError,
    refetch,
  } = useGetAllRolesQuery(user.tenant_id ?? skipToken);
  // const [updateStatusApi, updateStatusApiResult] = useUpdateRoleMutation();
  const role = useCallback(() => {
    if (roleData?.data.length && !isError) {
      return roleData.data
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
            // description: data.description,
          },
        }));
    } else return [];
  }, [roleData, searchText, isError]);

  // const handleRoleStatus = async (data) => {
  //   const updatedStatus = data.active === "Y" ? "N" : "Y";
  //   const submitData = {
  //     id: data.id,
  //     active: updatedStatus,
  //     name: data.name,
  //     description: data.description,
  //     tenantId: user.tenant_id,
  //   };
  //   try {
  //     await updateStatusApi(submitData).unwrap();
  //     refetch();
  //   } catch (err) {
  //     console.log("Error updating Role status:", err);
  //   }
  // };

  return (
    <div>
      <HeadingComp
        heading="Role Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Role"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: role(),
          columns: ["Sl.No", "Role Name", "Actions"],
          actions: [
            // [
            //   ({ data }) => {
            //     const isActive = data.active === "Y";
            //     return (
            //       <button
            //         disabled={updateStatusApiResult.isLoading}
            //         onClick={() => handleRoleStatus(data)}
            //         className={twMerge(
            //           "button-1 rounded-md px-2 py-0.5 button-inactive text-md font-medium",
            //           isActive && "button-active"
            //         )}
            //       >
            //         {isActive ? "Active" : "Inactive"}
            //       </button>
            //     );
            //   },
            // ],
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
      <CreateRoleMaster {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default Role;
