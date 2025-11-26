import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateTenantMaster } from "./CreateTenant";
import { useCallback, useState } from "react";
import { MdEdit } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import {
  useGetAllTenantQuery,
  useUpdateStatusTenantMutation,
} from "@/app/rtkQueries/tenantApi";

const TenantMaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onClose = () => setIsOpen(false);

  const {
    data: tenantsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllTenantQuery();

  const [updateStatusApi, updateStatusApiResult] =
    useUpdateStatusTenantMutation();

  const tenants = useCallback(() => {
    if (tenantsData?.data.length && !isError) {
      return tenantsData.data
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
            tenantName: data.tenantName,
            email: data.email,
            phone: data.phone,
          },
        }));
    } else return [];
  }, [tenantsData, searchText, isError]);

  const handleTenantStatus = async (data) => {
    const updatedStatus = data.active === "Y" ? "N" : "Y";
    const submitData = {
      id: data.id,
      active: updatedStatus,
    };
    try {
      await updateStatusApi(submitData).unwrap();
      refetch();
    } catch (err) {
      console.log("Error updating tenant status:", err);
    }
  };

  return (
    <div>
      <HeadingComp
        heading="Tenant Master"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Tenant"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
        refetch={refetch}
      />
      <CustomTable1
        {...{
          isLoading,
          datas: tenants(),
          columns: [
            "Sl.No",
            "Tenant Name",
            "Email",
            "Phone number",
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
                    onClick={() => handleTenantStatus(data)}
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
      <CreateTenantMaster {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default TenantMaster;
