import { useGetAllOfficeShiftsQuery } from "@/app/rtkQueries/shiftApi";
import {
  useCreateWeekendMutation,
  useGetWeekendByShiftQuery,
  useUpdateWeekendMutation,
} from "@/app/rtkQueries/weekendApi";
import { CustomTable1 } from "@/components/Common/CustomTable1";
import { HeadingComp } from "@/components/Common/HeadingComp";
import { Loading } from "@/components/Common/Loading";
import { SearchBar } from "@/components/Common/SearchBar";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const days = [
  { dayId: 1, name: "Monday" },
  { dayId: 2, name: "Tuesday" },
  { dayId: 3, name: "Wednesday" },
  { dayId: 4, name: "Thursday" },
  { dayId: 5, name: "Friday" },
  { dayId: 6, name: "Saturday" },
  { dayId: 7, name: "Sunday" },
];

const weekends = ["weekend1", "weekend2", "weekend3", "weekend4", "weekend5"];

const INITIAL_DETAILS = {
  shiftId: "",
  active: "Y",
};

const INITIAL_DAYS_LIST = [1, 2, 3, 4, 5, 6, 7].map((dayId) => ({
  dayId: dayId,
  weekend1: false,
  weekend2: false,
  weekend3: false,
  weekend4: false,
  weekend5: false,
}));

const WeekendMas = () => {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [daysList, setDaysList] = useState(INITIAL_DAYS_LIST);

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  //queries
  const {
    data: weekendData,
    isFetching: weekendLoading,
    isError: weekendError,
  } = useGetWeekendByShiftQuery(
    office?.id && details?.shiftId
      ? {
          officeId: office.id,
          shiftId: details.shiftId,
        }
      : skipToken,
    {
      refetchOnMountOrArgChange: true,
      keepUnusedDataFor: 0,
      selectFromResult: (result) => ({
        ...result,
        data: result.isError || result.isFetching ? undefined : result.data,
      }),
    }
  );

  const {
    data: shiftData,
    isLoading: shiftLoading,
    isError: shiftError,
  } = useGetAllOfficeShiftsQuery(
    user?.tenant_id && office?.id
      ? {
          tenantId: user.tenant_id,
          officeId: office.id,
        }
      : skipToken
  );

  //mutations
  const [createApi, createApiRes] = useCreateWeekendMutation();
  const [editApi, editApiRes] = useUpdateWeekendMutation();

  const shiftOptions =
    shiftData?.data?.length && !shiftError
      ? shiftData.data.map((data) => ({
          name: data.shiftName,
          id: data.id,
          value: data.id,
        }))
      : [];

  const datas = daysList
    .map((day) => {
      let weekendCells = {};
      weekendCells.dayName =
        days.find((d) => d.dayId === day.dayId)?.name || "";
      return {
        tableData: weekendCells,
        other: day,
      };
    })
    .sort((a, b) => a.other.dayId - b.other.dayId);

  useEffect(() => {
    if (weekendData && !weekendLoading && !weekendError) {
      setDetails((prev) => ({
        ...prev,
        shiftId: weekendData.data.shiftId,
        active: weekendData.data.active,
        id: weekendData.data.id,
      }));
      setDaysList(weekendData.data.daysList);
    } else {
      setDetails((prev) => ({ ...prev, id: undefined }));
      setDaysList(INITIAL_DAYS_LIST);
    }
  }, [weekendData, weekendLoading]);

  const handleCheck = ({ dayId, weekend }) => {
    const updatedDaysList = daysList.map((day) => {
      if (day.dayId === dayId) {
        return {
          ...day,
          [weekend]: !day[weekend],
        };
      }
      return day;
    });

    setDaysList(updatedDaysList);
  };

  const handleSelect = ({ name, value }) => {
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        officeId: office.id,
        staffId: user.id,
        ...details,
        daysList: daysList,
      };

      if (details.id) await editApi(submitData);
      else await createApi(submitData);
      setDetails(INITIAL_DETAILS);
      refetch();
      onClose();
      toast.success("Weekend saved successfully");
    } catch (err) {
      console.log("Error creating Weekend:", err);
    }
  };

  return (
    <div>
      <HeadingComp hideSearch heading="Weekend Master" iconToShow={[]} />

      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 w-full mb-2">
          <SearchBar
            required
            placeholder="Select Shift..."
            value={details.shiftId}
            onChange={(value) => handleSelect({ name: "shiftId", value })}
            options={shiftOptions}
            className="w-1/3"
          />
          {weekendLoading && <Loading className="w-12 h-8" />}
        </div>
        <CustomTable1
          isLoading={shiftLoading}
          errorMessage={office?.id ? null : "Please select an office"}
          datas={datas}
          containerClass="max-h-[calc(100vh-15rem)]"
          className="table-2"
          columns={["Day", "Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]}
          actions={weekends.map((weekend) => [
            ({ data }) => {
              return (
                <WeekendCheckbox
                  isChecked={data[weekend] || false}
                  onChange={() => handleCheck({ dayId: data.dayId, weekend })}
                />
              );
            },
          ])}
        />
        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={() => setDaysList(INITIAL_DAYS_LIST)}
            className="button-1 button-3 rounded px-3 py-1"
          >
            Reset
          </button>
          <button
          disabled={shiftLoading || weekendLoading}
          className="button-1 rounded px-3 py-1">
            {details.id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

const WeekendCheckbox = ({ isChecked, onChange }) => {
  return (
    <div className="w-full text-center">
      <input
        type="checkbox"
        className="w-4 h-4 cursor-pointer"
        checked={isChecked}
        onChange={onChange}
      />
    </div>
  );
};

export default WeekendMas;
