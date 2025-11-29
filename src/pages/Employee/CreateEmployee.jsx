import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { SearchBar } from "@/components/Common/SearchBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetActiveOfficesQuery } from "@/app/rtkQueries/officeApi";
import { ToggleSwitch } from "@/components/Common/ToggleSwitch";
import { useGetRolesQuery } from "@/app/rtkQueries/roleApi";
import { useGetAllDesignationsQuery } from "@/app/rtkQueries/designationApi";
import { useGetActiveDepartmentsQuery } from "@/app/rtkQueries/departmentApi";
import {
  useCreateEmployeeMutation,
  useGetOfficeEmployeesQuery,
  useUpdateEmployeeMutation,
} from "@/app/rtkQueries/employeeApi";

const INITIAL_DETAILS = {
  tenantId: "",
  departmentId: "",
  designationId: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  role: "",
  reportingStaff: "",
  geoSense: false,
  outsideClockin: false,
  multipleClockIn: false,
};

export const CreateEmployee = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);

  const user = useSelector((state) => state.auth.user);

  const office = useSelector((state) => state.auth.office);

  //queries
  const { data: offices } = useGetActiveOfficesQuery(
    user.tenant_id ?? skipToken
  );

  const { data: employees } = useGetOfficeEmployeesQuery(
    {
      tenantId: user.tenant_id,
      officeId: 0,
    } ?? skipToken
  );

  const { data: roles } = useGetRolesQuery(user.tenant_id ?? skipToken);

  const { data: departments } = useGetActiveDepartmentsQuery(
    user.tenant_id ?? skipToken
  );

  const { data: designations } = useGetAllDesignationsQuery(
    user.tenant_id ?? skipToken
  );

  //mutations
  const [createApi, createApiRes] = useCreateEmployeeMutation();
  const [editApi, editApiRes] = useUpdateEmployeeMutation();

  const officeOptions = offices?.data
    ? offices?.data.map((data) => ({
        id: data.id,
        name: data.officeName,
        label: data.officeName,
        value: data.id,
      }))
    : [];

  const reportingStaffOptions = employees?.data
    ? employees?.data
        .filter((x) => x.roleName === "Admin Manager")
        .map((data) => ({
          id: data.id,
          name: data.fullName,
          label: data.fullName,
          value: data.id,
        }))
    : [];

  const roleOptions = roles?.data
    ? roles?.data.map((data) => ({
        id: data.id,
        name: data.name,
        label: data.name,
        value: data.id,
      }))
    : [];

  const departmentOptions = departments?.data
    ? departments?.data.map((data) => ({
        id: data.id,
        name: data.deptname,
        label: data.deptname,
        value: data.id,
      }))
    : [];

  const designationOptions = designations?.data
    ? designations?.data.map((data) => ({
        id: data.id,
        name: data.designame,
        label: data.designame,
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

  const handleSelectChange = (value, name) => {
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (name) => {
    setDetails((prev) => ({
      ...prev,
      [name]: !prev[name],
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
      toast.success(
        `Employee ${details.id ? "updated" : "created"} successfully`
      );
    } catch (err) {
      console.log("Error creating Geo Location:", err);
    }
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Create Employee",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="h-[calc(100vh-5rem)] w-full flex flex-col py-3"
      >
        <div className="flex-1 px-5 pb-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <CommonInput
              required
              onChange={handleChange}
              name="fullName"
              value={details.fullName}
              type="text"
              label="Name"
              placeholder="Enter Name"
            />
            <SearchBar
              required
              onChange={(value) => handleSelectChange(value, "officeId")}
              name="officeId"
              value={details.officeId}
              label="Office"
              placeholder="Search Office"
              options={officeOptions}
            />

            <SearchBar
              required
              onChange={(value) => handleSelectChange(value, "role")}
              name="role"
              value={details.role}
              label="Role"
              placeholder="Search Role"
              options={roleOptions}
            />

            <SearchBar
              required
              onChange={(value) => handleSelectChange(value, "departmentId")}
              name="departmentId"
              value={details.departmentId}
              label="Department"
              placeholder="Search Department"
              options={departmentOptions}
            />

            <SearchBar
              required
              onChange={(value) => handleSelectChange(value, "designationId")}
              name="designationId"
              value={details.designationId}
              label="Designation"
              placeholder="Search Designation"
              options={designationOptions}
            />

            <CommonInput
              required
              name="phoneNumber"
              value={details.phoneNumber}
              onChange={handleChange}
              min={0}
              max={9999999999}
              errorMessage="Please enter a valid phone number"
              type="number"
              label="Phone"
              placeholder="Enter Phone Number"
            />

            <CommonInput
              required
              name="email"
              value={details.email}
              onChange={handleChange}
              type="email"
              label="Email"
              placeholder="Enter Email"
            />

            <SearchBar
              onChange={(value) => handleSelectChange(value, "reportingStaff")}
              name="reportingStaff"
              value={details.reportingStaff}
              label="Reporting Staff"
              placeholder="Search Reporting Staff"
              options={reportingStaffOptions}
            />
          </div>
          <div className="flex items-center justify-between w-full pt-2">
            <label>Outside Punch Request</label>
            <ToggleSwitch
              name="outsideClockin"
              value={details.outsideClockin}
              onChange={() => handleToggleChange("outsideClockin")}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <label>Multiple Clock-In</label>
            <ToggleSwitch
              name="multipleClockIn"
              value={details.multipleClockIn}
              onChange={() => handleToggleChange("multipleClockIn")}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <label>Geosense</label>
            <ToggleSwitch
              name="geoSense"
              value={details.geoSense}
              onChange={() => handleToggleChange("geoSense")}
            />
          </div>
        </div>
        <div className="w-full flex gap-3 px-5 ">
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
