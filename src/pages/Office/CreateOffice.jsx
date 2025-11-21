import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import {
  useCreateOfficeMutation,
  useGetActiveOfficesQuery,
  useUpdateOfficeMutation,
} from "../../app/features/office/officeApi";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetCountriesQuery,
  useGetStatesQuery,
} from "../../app/common/commonApi";
import { useEffect, useState } from "react";
import { useGetActiveSectorQuery } from "../../app/features/sector/sectorApi";
import toast from "react-hot-toast";

const OFFICE_TYPE_OPTIONS = [
  { label: "BRANCH", value: "Branch" },
  { label: "REGIONAL", value: "Regional" },
  { label: "DEPARTMENT", value: "Department" },
  { label: "OTHER", value: "Other" },
];

const INITIAL_DETAILS = {
  sectorId: "",
  tenantId: "",
  officeName: "",
  officeType: "",
  parentOfficeId: "",
  address: "",
  active: "",
};

export const CreateOffice = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);

  const user = useSelector((state) => state.auth.user);

  //queries
  const { data: activeOffices, isLoading: isLoadingActiveOffices } =
    useGetActiveOfficesQuery(user.tenant_id ?? skipToken);

  const { data: sectors, isLoading: isLoadingSectors } =
    useGetActiveSectorQuery(user.tenant_id ?? skipToken);

  const { data: countries, isLoading: isLoadingCountries } =
    useGetCountriesQuery();

  const { data: states, isLoading: isLoadingStates } = useGetStatesQuery();

  //mutations
  const [createApi, createApiRes] = useCreateOfficeMutation();
  const [editApi, editApiRes] = useUpdateOfficeMutation();

  const stateOptions = states?.data
    ? states?.data.map((state) => ({
        label: state.statename,
        value: state.id,
      }))
    : [];

  useEffect(() => {
    if (typeof isOpen === "object" && isOpen !== null) {
      setDetails({
        ...isOpen,
        parentOfficeId: isOpen.parentOfficeId,
      });
    } else {
      setDetails(INITIAL_DETAILS);
    }
  }, [isOpen]);

  const countryOptions = countries?.data
    ? countries?.data.map((country) => ({
        label: country.country,
        value: country.id,
      }))
    : [];

  const officesOptions = activeOffices?.data
    ? activeOffices?.data
        .filter((office) => office.officeType === "Branch")
        .map((office) => ({
          label: office.officeName,
          value: office.id,
        }))
    : [];

  const sectorOptions = sectors?.data
    ? sectors?.data.map((office) => ({
        label: office.sectorName,
        value: office.id,
      }))
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
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

      if (details.id) await editApi(submitData);
      else await createApi(submitData);
      setDetails(INITIAL_DETAILS);
      refetch();
      onClose();
      toast.success("Office saved successfully");
    } catch (err) {
      console.log("Error creating Office:", err);
    }
  };

  return (
    <Modal
      {...{
        isOpen: isOpen ? true : false,
        onClose,
        dialogTitle: "Create Office",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 py-3 overflow-y-auto flex flex-col justify-between"
      >
        <div className="flex-1 space-y-5 overflow-y-auto px-5 pb-1">
          <CommonInput
            required
            onChange={handleChange}
            name="officeName"
            value={details.officeName}
            type="text"
            label="Office Name"
            placeholder="Enter Office Name"
          />
          <CommonInput
            required
            onChange={handleChange}
            name="sectorId"
            value={details.sectorId}
            type="select"
            label="Sector"
            options={sectorOptions}
            placeholder="Select Office Type"
          />
          <CommonInput
            required
            onChange={handleChange}
            name="officeType"
            value={details.officeType}
            type="select"
            label="Office Type"
            options={OFFICE_TYPE_OPTIONS}
            placeholder="Select Office Type"
          />
          <CommonInput
            required
            onChange={handleChange}
            name="parentOfficeId"
            value={details.parentOfficeId}
            type="select"
            label="Parent Office"
            options={officesOptions}
            placeholder="Select Parent Office"
          />
          <CommonInput
            required
            onChange={handleChange}
            name="countryId"
            value={details.countryId}
            type="select"
            label="Country"
            options={countryOptions}
            placeholder="Select Country"
          />
          <CommonInput
            required
            onChange={handleChange}
            name="stateId"
            value={details.stateId}
            type="select"
            label="State"
            options={stateOptions}
            placeholder="Select State"
          />
          <CommonInput
            required
            onChange={handleChange}
            name="address"
            value={details.address}
            type="textarea"
            label="Address"
            placeholder="Enter Address"
          />
        </div>
        <div className="w-full flex gap-3 px-5 ">
          <button
            type="reset"
            className="button-1 w-full button-3 rounded-md py-1.5 px-3"
          >
            Reset
          </button>
          <button
            type="submit"
            className="button-1 w-full rounded-md py-1.5 px-3"
          >
            {details.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
