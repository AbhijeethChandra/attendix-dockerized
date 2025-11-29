import { BellAlertIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { CommonInput } from "../Common/CommonInput";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLogoutApiMutation } from "@/app/rtkQueries/authApi";
import {
  handleLogoutSlice,
  handleOfficeUpdate,
  handleTenantUpdate,
} from "@/app/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetOfficesQuery,
  useGetUnreadNotificationsQuery,
  useUpdateAllNotificationsReadStatusMutation,
  useUpdateNotificationReadStatusMutation,
} from "@/app/rtkQueries/dashboardApi";
import { TbLockCode } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { skipToken } from "@reduxjs/toolkit/query";
import { SearchBar } from "../Common/SearchBar";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import dayjs from "@/utils/dayjs";
import toast from "react-hot-toast";
import {
  useGetAllTenantQuery,
} from "@/app/rtkQueries/tenantApi";
import { useLocation } from "react-router";
import { ChangePassword } from "./ChangePassword";

export const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectAllNotifications, setSelectAllNotifications] = useState(false);
  const [changePasswordView, setChangePasswordView] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const profileMenuRef = useRef(null);
  const profileMenuParentRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationParentRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const [logoutApi, logoutApiResult] = useLogoutApiMutation();

  //queries
  const { data: officesData, isLoading: isOfficeLoading } = useGetOfficesQuery(
    user.tenant_id ? user.tenant_id : skipToken
  );

  const {
    data: unreadNotificationsData,
    isLoading: isUnreadNotificationsLoading,
    refetch: refetchUnreadNotifications,
  } = useGetUnreadNotificationsQuery(user.staffId ? user.staffId : skipToken);

  const {
    data: tenantData,
    isLoading: isTenantLoading,
    refetch: refetchTenantData,
  } = useGetAllTenantQuery(user.role.name !== "Super Admin" && skipToken);

  //mutations
  const [readNotificationApi, readNotificationApiResult] =
    useUpdateNotificationReadStatusMutation();

  const [readAllNotificationApi, readAllNotificationApiResult] =
    useUpdateAllNotificationsReadStatusMutation();

  const unreadNotificationsCount = useCallback(() => {
    if (unreadNotificationsData?.data?.length > 0) {
      return unreadNotificationsData.data.length;
    } else return 0;
  }, [unreadNotificationsData]);

  const officesOptions = useCallback(() => {
    if (officesData?.data?.length > 0) {
      let options = officesData.data.map((office) => ({
        name: office.officeName,
        value: office.id,
        id: office.id,
      }));
      if (user.role.name === "Super Admin") {
        return options;
      }
      return [{ name: "All Offices", value: 0, id: 0 }, ...options];
    } else return [];
  }, [officesData]);

  const tenantOptions = useCallback(() => {
    if (tenantData?.data?.length > 0) {
      let options = tenantData.data.map((office) => ({
        name: office.tenantName,
        value: office.id,
        id: office.id,
      }));
      return [...options];
    } else return [];
  }, [tenantData]);

  useEffect(() => {
    if (!user.tenant_id && tenantData?.data?.length > 0) {
      const defaultTenant = tenantData.data[0];
      dispatch(handleTenantUpdate(defaultTenant.id));
    }
    if (
      !office?.id &&
      office?.name !== "All Offices" &&
      officesData?.data?.length > 0
    ) {
      const defaultOffice = officesOptions()[0];
      dispatch(
        handleOfficeUpdate({
          id: defaultOffice.id,
          officeName: defaultOffice.name,
          name: defaultOffice.name,
          value: defaultOffice.id,
        })
      );
    }
  }, [officesData, tenantData]);

  useEffect(() => {
    const handleClickOutside = (event, ref, parentRef) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !parentRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", (e) => {
      handleClickOutside(e, profileMenuRef, profileMenuParentRef);
      handleClickOutside(e, notificationRef, notificationParentRef);
    });
    return () => {
      document.removeEventListener("mousedown", (e) => {
        handleClickOutside(e, profileMenuRef, profileMenuParentRef);
        handleClickOutside(e, notificationRef, notificationParentRef);
      });
    };
  }, [profileMenuRef, notificationRef]);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleNotificationOpen = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleLogout = async () => {
    try {
      const resp = await logoutApi().unwrap();
      if (resp.success) {
        dispatch(handleLogoutSlice());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOfficeChange = (value) => {
    const options = officesOptions();
    const selectedOffice = options.find((office) => office.value === value);
    dispatch(handleOfficeUpdate(selectedOffice));
  };

  const handleTenantChange = (value) => {
    const options = tenantOptions();
    const selectedTenant = options.find((tenant) => tenant.value === value);
    dispatch(handleTenantUpdate(value));
  };

  const confirmToast = () => {
    setIsNotificationOpen(false);
    toast.custom(
      (t) => (
        <div className="bg-gray-100 p-3 shadow-md rounded min-w-[250px]">
          <h3 className="text-lg text-center">Mark all as read?</h3>
          <div className="flex gap-2 mt-2 items-center justify-center">
            <button
              className="button-1 rounded-md px-3 py-1"
              onClick={() => {
                handleReadNotifications();
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>

            <button
              className="button-1 button-3 rounded-md px-3 py-1"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleReadNotifications = async (id) => {
    try {
      console.log(
        unreadNotificationsData?.data?.length === 0,
        selectAllNotifications,
        id
      );
      if (
        unreadNotificationsData?.data?.length == 0 ||
        (!selectAllNotifications && !id) ||
        readAllNotificationApiResult.isLoading ||
        readNotificationApiResult.isLoading
      )
        return;
      let resp;
      if (id) {
        resp = await readNotificationApi({ notificationId: id }).unwrap();
      } else {
        resp = await readAllNotificationApi({
          staffId: user.staffId,
        }).unwrap();
      }
      if (resp.success) {
        refetchUnreadNotifications();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-5 h-16 flex gap-4 justify-end items-center bg-[var(--color-header)]">
      <div className="flex gap-4 ">
        {user?.role?.name === "Super Admin" && (
          <div className="w-full">
            <SearchBar
              value={user?.tenant_id}
              placeholder="Please tenant"
              containerClass={`bg-[var(--color-bg-2)] border-none`}
              onChange={handleTenantChange}
              options={tenantOptions()}
              optionMenuClass="z-90"
            />
          </div>
        )}
        {(user?.role?.name !== "Super Admin" ||
          location.pathname === "/employee-master") && (
          <div className="w-full">
            <SearchBar
              value={office?.id}
              placeholder="Please office"
              containerClass={`bg-[var(--color-bg-2)] border-none`}
              onChange={handleOfficeChange}
              options={officesOptions()}
              optionMenuClass="z-90"
            />
          </div>
        )}
      </div>
      <div className="flex gap-6 items-center">
        <div ref={notificationParentRef} className="relative">
          {unreadNotificationsCount() > 0 && (
            <div
              onClick={toggleNotificationOpen}
              className="cursor-pointer p-1 rounded-full bg-[red] absolute -top-2 -right-3 text-[9.5px] text-[var(--color-text-3)] font-bold"
            >
              {unreadNotificationsCount()}
            </div>
          )}
          <BellAlertIcon
            onClick={toggleNotificationOpen}
            className="size-6 cursor-pointer stroke-[var(--color-icon-1)] text-transparent"
          />
          {isNotificationOpen && (
            <div
              ref={notificationRef}
              className="z-[20] p-1 bg-[var(--color-bg-2)] shadow-[-5px_5px_5px_rgba(0,0,0,0.1)] rounded absolute top-10 right-2 w-80"
            >
              {unreadNotificationsData?.data?.length > 0 && (
                <div className="flex gap-3 p-3  justify-between items-center border-b border-[var(--color-border-1)]">
                  <div className="flex gap-2">
                    <CommonInput
                      type="checkbox"
                      value={selectAllNotifications}
                      onChange={setSelectAllNotifications}
                      name="selectAllNotifications"
                      placeholder="Search Notifications"
                      containerClass="w-fit justify-center"
                    />
                    <label htmlFor="selectAllNotifications">Select All</label>
                  </div>
                  {selectAllNotifications && (
                    <MdDelete
                      onClick={confirmToast}
                      className="size-5 text-[var(--color-icon-error)] cursor-pointer"
                    />
                  )}
                </div>
              )}

              <div className="overflow-y-auto scrollbar-hidden p-3 max-h-80 space-y-2">
                {unreadNotificationsData?.data?.length > 0 ? (
                  unreadNotificationsData.data.map((notification) => (
                    <div
                      key={notification.id}
                      className="relative group p-3 rounded shadow-md hover:bg-[var(--color-bg-1)] cursor-pointer space-y-1"
                    >
                      <div className="font-semibold text-[var(--color-text-1)] flex justify-between">
                        {notification.subject}
                        <div className="text-xs group-hover:visible invisible text-[var(--color-text-3)]">
                          <MdDelete
                            onClick={() =>
                              handleReadNotifications(notification.id)
                            }
                            className="size-5 text-[var(--color-icon-error)] cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="text-sm text-[var(--color-text-1)]">
                        {notification.notifyContent}
                      </div>
                      <div className="text-sm text-[var(--color-text-2)]">
                        Date :
                        {dayjs(notification.notifyTime).format(
                          "YYYY-MM-DD hh:mm A"
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-[var(--color-text-2)]">
                    No new notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center justfy-center">
          <UserCircleIcon className="size-8 cursor-pointer text-[var(--color-icon-1)]" />
          <div className="flex flex-col">
            <span className="font-medium text-[var(--color-text-3)]">
              {user?.fullName}
            </span>
            <span className="text-xs text-[var(--color-text-3)]">
              {user?.role?.name}
            </span>
          </div>
        </div>
        <IoIosArrowDropdown
          ref={profileMenuParentRef}
          onClick={toggleProfileMenu}
          className="size-5 text-[var(--color-icon-1)] cursor-pointer"
        />
        {isProfileMenuOpen && (
          <div
            ref={profileMenuRef}
            className="absolute z-90 top-15 right-5 bg-[var(--color-bg-2)] rounded p-4 px-5 shadow-[-5px_15px_10px_rgba(0,0,0,0.1)] space-y-4"
          >
            <div onClick={()=>setChangePasswordView(true)} className="text-[var(--color-text-1)] cursor-pointer hover:text-shadow-md hover:scale-105">
              <TbLockCode className="inline size-5 mr-2 text-[var(--color-icon-2)]" />
              Change Password
            </div>
            <div
              onClick={handleLogout}
              className="text-[var(--color-text-1)] cursor-pointer hover:text-shadow-md hover:scale-105"
            >
              <IoMdLogOut className="inline size-5 mr-2 text-[var(--color-icon-2)]" />
              Logout
            </div>
          </div>
        )}
      </div>
      <ChangePassword {...{isOpen:changePasswordView, onClose: () => setChangePasswordView(false)}}/>
    </div>
  );
};
