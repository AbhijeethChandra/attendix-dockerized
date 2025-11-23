import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { SearchBar } from "@/components/Common/SearchBar";
import { useEffect, useState } from "react";
import { useGetActiveOfficesQuery } from "@/app/rtkQueries/officeApi";
import { useSelector } from "react-redux";
import {
  useCreateGeolocationMutation,
  useUpdateGeolocationMutation,
} from "@/app/rtkQueries/geolocationApi";
import toast from "react-hot-toast";

const INITIAL_DETAILS = {
  officeId: "",
  latitude: "",
  longitude: "",
  geoRadius: "",
};

export const CreateGeoLocation = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);

  const user = useSelector((state) => state.auth.user);

  //queries
  const { data: offices } = useGetActiveOfficesQuery(
    user.tenant_id ?? skipToken
  );

  //mutations
  const [createApi, createApiRes] = useCreateGeolocationMutation();
  const [editApi, editApiRes] = useUpdateGeolocationMutation();

  const officesOptions = offices?.data
    ? offices?.data.map((data) => ({
        id: data.id,
        name: data.officeName,
        label: data.officeName,
        value: data.id,
      }))
    : [];

  useEffect(() => {
    if (typeof isOpen === "object" && isOpen !== null) {
      setDetails({
        ...isOpen,
      });
    } else {
      setDetails(INITIAL_DETAILS);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setDetails((prev) => ({
      ...prev,
      officeId: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...details,
        tenantId: user.tenant_id,
        active: "Y",
      };

      if (details.id) await editApi(submitData).unwrap();
      else await createApi(submitData).unwrap();

      setDetails(INITIAL_DETAILS);
      refetch();
      onClose();
      toast.success("Geo Location saved successfully");
    } catch (err) {
      console.log("Error creating Geo Location:", err);
    }
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Create Geo Location",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 px-5 py-3 overflow-y-auto flex flex-col justify-between"
      >
        <div className="flex-1 space-y-5">
          <SearchBar
            required
            onChange={handleSelectChange}
            name="officeId"
            value={details.officeId}
            label="Office"
            placeholder="Search Office"
            options={officesOptions}
          />
          <CommonInput
            required
            onChange={handleChange}
            name="geoRadius"
            value={details.geoRadius}
            type="number"
            label="Radius (in meters)"
            placeholder="Enter Radius"
          />
          <CommonInput
            required
            onChange={handleChange}
            name="latitude"
            value={details.latitude}
            type="number"
            label="Latitude"
            placeholder="Enter Latitude "
          />
          <CommonInput
            required
            onChange={handleChange}
            name="longitude"
            value={details.longitude}
            type="number"
            label="Longitude"
            placeholder="Enter Longitude"
          />
        </div>
        <div className="w-full flex gap-3">
          <button
            type="reset"
            onClick={()=>setDetails(INITIAL_DETAILS)}
            className="button-1 w-full button-3 rounded-md py-1.5 px-3"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={createApiRes.isLoading || editApiRes.isLoading}
            className="button-1 w-full rounded-md py-1.5 px-3"
          >
            {details.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
