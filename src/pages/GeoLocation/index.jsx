import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { CreateGeoLocation } from "./CreateGeoLocation";
import { MdEdit } from "react-icons/md";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetAllGeolocationsQuery } from "../../app/features/geolocation/geolocationApi";

const GeoLocation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);
  const [searchText, setSearchText] = useState("");

  const onClose = () => setIsOpen(false);

  const {
    data: geolocationData,
    isLoading,
    isError,
    refetch,
  } = useGetAllGeolocationsQuery({
    tenantId: user.tenant_id ?? skipToken,
    officeId: office?.id ?? skipToken,
  });

  const geolocation = useCallback(() => {
    if (geolocationData?.data.length && !isError) {
      return geolocationData.data
        .filter((data) =>
          data?.officeName?.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((data, index) => ({
          other: {
            ...data,
          },
          tableData: {
            sl: index + 1,
            officeName: data.officeName,
            latitude: data.latitude,
            longitude: data.longitude,
            geoRadius: data.geoRadius,
          },
        }));
    } else return [];
  }, [geolocationData, searchText, isError]);

  return (
    <div>
      <HeadingComp
        heading="Geo Location"
        iconToShow={[]}
        handleButtonClick={() => setIsOpen(true)}
        createButtonText="Create Geo Location"
        searchValue={searchText}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <CustomTable1
        {...{
          isLoading: isLoading,
          errorMessage: office?.id ? null : "Please select an office",
          datas: geolocation(),
          columns: [
            "Sl.No",
            "Office Name",
            "Latitude",
            "Longitude",
            "Geo Radius",
            "Actions",
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
      <CreateGeoLocation {...{ isOpen, onClose, refetch }} />
    </div>
  );
};

export default GeoLocation;
