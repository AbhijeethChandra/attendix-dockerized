import { BellAlertIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { CommonInput } from "../Common/CommonInput";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLogoutApiMutation } from "@/app/rtkQueries/authApi";
import { handleLogoutSlice, handleOfficeUpdate } from "@/app/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetOfficesQuery,
  useGetUnreadNotificationsQuery,
} from "@/app/rtkQueries/dashboardApi";
import { TbLockCode } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { skipToken } from "@reduxjs/toolkit/query";
import { SearchBar } from "../Common/SearchBar";
import { IoIosArrowDropdown } from "react-icons/io";

export const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  const profileMenuRef = useRef(null);
  const profileMenuParentRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationParentRef = useRef(null);
  const dispatch = useDispatch();

  const [logoutApi, logoutApiResult] = useLogoutApiMutation();

  const { data: officesData, isLoading: isOfficeLoading } = useGetOfficesQuery(
    user.tenant_id ? user.tenant_id : skipToken
  );

  const {
    data: unreadNotificationsData,
    isLoading: isUnreadNotificationsLoading,
  } = useGetUnreadNotificationsQuery(user.staffId ? user.staffId : skipToken);

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
      return [{ name: "All Offices", value: null, id: null }, ...options];
    } else return [];
  }, [officesData]);

  useEffect(() => {
    if (
      !office?.id &&
      office.name !== "All Offices" &&
      officesData?.data?.length > 0
    ) {
      const defaultOffice = officesData.data[0];
      dispatch(
        handleOfficeUpdate({
          id: defaultOffice.id,
          officeName: defaultOffice.officeName,
          name: defaultOffice.officeName,
          value: defaultOffice.id,
        })
      );
    }
  }, [officesData, office]);

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

  const handleTenantChange = (value) => {
    const options = officesOptions();
    const selectedOffice = options.find((office) => office.value === value);
    dispatch(handleOfficeUpdate(selectedOffice));
  };

  return (
    <div className="px-5 h-16 flex justify-between items-center bg-[var(--color-header)]">
      <div className="w-[35%]">
        <SearchBar
          value={office?.id}
          placeholder="Please choose your company"
          containerClass={`bg-[var(--color-bg-2)] border-none`}
          onChange={handleTenantChange}
          options={officesOptions()}
          optionMenuClass="z-90"
        />
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
              className="z-[20] p-4 bg-[var(--color-bg-2)] shadow-[-5px_5px_5px_rgba(0,0,0,0.1)] space-y-2 rounded absolute top-10 right-2 max-h-80 w-80 overflow-y-auto scrollbar-hidden"
            >
              {unreadNotificationsData?.data?.length > 0 ? (
                unreadNotificationsData.data.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-b border-[var(--color-border-1)] last:border-0 pb-2"
                  >
                    <div className="text-sm text-[var(--color-text-1)]">
                      {notification.notifyContent}
                    </div>
                    <div className="text-sm text-[var(--color-text-2)]">
                      {notification.message}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-[var(--color-text-2)]">
                  No new notifications
                </div>
              )}
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
          className="size-3 text-[var(--color-icon-1)] cursor-pointer"
        />
        {isProfileMenuOpen && (
          <div
            ref={profileMenuRef}
            className="absolute z-90 top-15 right-5 bg-[var(--color-bg-2)] rounded p-4 px-5 shadow-[-5px_15px_10px_rgba(0,0,0,0.1)] space-y-4"
          >
            <div className="text-[var(--color-text-1)] cursor-pointer hover:text-shadow-md hover:scale-105">
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
    </div>
  );
};
