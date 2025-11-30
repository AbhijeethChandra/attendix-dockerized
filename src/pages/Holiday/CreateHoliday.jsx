import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { SearchBar } from "@/components/Common/SearchBar";
import { useEffect, useState } from "react";
import { useGetActiveOfficesQuery } from "@/app/rtkQueries/officeApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useCreateHolidayMutation,
  useUpdateHolidayMutation,
} from "@/app/rtkQueries/holidayApi";
import { ToggleSwitch } from "@/components/Common/ToggleSwitch";
import dayJs from "@/utils/dayjs";
import { skipToken } from "@reduxjs/toolkit/query";

const INITIAL_DETAILS = {
  tenantId: "",
  officeId: "",
  holidayDate: "",
  holidayName: "",
  isOptional: false,
  isGlobal: false,
  offices: [],
};

export const CreateHoliday = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  //queries
  const { data: offices } = useGetActiveOfficesQuery(
    user.tenant_id ?? skipToken
  );

  //mutations
  const [createApi, createApiRes] = useCreateHolidayMutation();
  const [editApi, editApiRes] = useUpdateHolidayMutation();

  const officesOptions = offices?.data
    ? offices.data?.map((data) => ({
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

  const handleDateChange = (date) => {
    const name = "holidayDate";
    setDetails((prev) => ({
      ...prev,
      [name]: dayJs(date).format("YYYY-MM-DD"),
    }));
  };

  const handleToggleChange = (name) => {
    setDetails((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSelectChange = (value, name) => {
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let submitData = [];

      if (details.id) {
        submitData = {
          ...details,
          tenantId: user.tenant_id,
          active: "Y",
        };
      } else {
        for (const officeId of details.offices) {
          submitData.push({
            tenantId: user.tenant_id,
            officeId: officeId,
            holidayDate: details.holidayDate,
            holidayName: details.holidayName,
            isOptional: details.isOptional,
            isGlobal: details.isGlobal,
            active: "Y",
          });
        }
      }

      // return console.log("submitData", submitData);

      if (details.id) await editApi(submitData).unwrap();
      else await createApi(submitData).unwrap();

      setDetails(INITIAL_DETAILS);
      refetch();
      onClose();
      toast.success(
        `Holiday ${details.id ? "updated" : "created"} successfully`
      );
    } catch (err) {
      console.log("Error creating Holiday:", err);
    }
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Create Holiday",
        panelClass: "w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 px-5 py-3 overflow-y-auto flex flex-col justify-between"
      >
        <div className="space-y-5 flex-1 gap-x-4 content-start">
          {!details.id && details.id !== 0 && (
            <SearchBar
              required
              multiple
              containerClass="flex-wrap"
              onChange={(value) => handleSelectChange(value, "offices")}
              value={details.offices}
              options={officesOptions}
              label="Offices"
              placeholder="Select Offices"
            />
          )}
          <CommonInput
            required
            onChange={handleChange}
            name="holidayName"
            value={details.holidayName}
            type="text"
            label="Holiday Name"
            placeholder="Enter Holiday Name"
          />
          <CommonInput
            required
            onChange={handleDateChange}
            name="holidayDate"
            value={details.holidayDate}
            type="date"
            label="Holiday Date"
            placeholder="Enter Holiday Date"
          />

          <div className="flex items-center justify-between w-full pt-2">
            <label>Optional Holiday</label>
            <ToggleSwitch
              value={details.isOptional}
              onChange={() => handleToggleChange("isOptional")}
            />
          </div>
          <div className="flex items-center justify-between w-full pt-2">
            <label>Global Holiday</label>
            <ToggleSwitch
              value={details.isGlobal}
              onChange={() => handleToggleChange("isGlobal")}
            />
          </div>
        </div>

        <div className="w-full flex gap-3">
          <button
            type="reset"
            onClick={() => setDetails(INITIAL_DETAILS)}
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
