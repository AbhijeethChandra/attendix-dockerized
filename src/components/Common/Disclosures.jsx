import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/app/slice/themeSlice";

export const Disclosures = (props) => {
  const {
    heading,
    HeadingComponent,
    HeadingIcon,
    description,
    containerClass,
    headingClass,
    descriptionClass,
    iconClass,
    iconContainerClass,
    buttonClass,
    parentRef,
    children,
  } = props;

  const ref = useRef(null);
  const disclosureRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClick(e) {
      if (!ref.current) return;
      if (
        !ref.current.contains(e.target) &&
        !parentRef?.current?.contains(e.target)
      ) {
        disclosureRef.current?.close();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar("EXPANDED"));
  };

  return (
    <Disclosure
      as="div"
      className={twMerge("flex flex-col", containerClass)}
      defaultOpen={false}
    >
      {({ open, close }) => {
        disclosureRef.current = { close };

        return (
          <div ref={ref} className="w-full flex flex-col">
            <DisclosureButton
              as="div"
              onClick={handleSidebarToggle}
              className={twMerge(
                "group flex w-full items-center justify-between",
                buttonClass
              )}
            >
              {HeadingComponent ? (
                <HeadingComponent />
              ) : (
                <span
                  className={twMerge(
                    "text-lg group-data-hover:text-white/80 flex items-center",
                    headingClass
                  )}
                >
                  {HeadingIcon && <HeadingIcon className="size-7 me-2" />}
                  {heading}
                </span>
              )}
              <div
                className={twMerge(
                  "h-full flex items-center",
                  iconContainerClass
                )}
              >
                <ChevronDownIcon
                  className={twMerge(
                    "stroke-[var(--color-text-2)] size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180",
                    iconClass
                  )}
                />
              </div>
            </DisclosureButton>
            <div
              className={twMerge(
                "overflow-hidden transition-all duration-600 ease-in-out",
                open ? "max-h-[200vh] mb-2" : "max-h-0"
              )}
            >
              <DisclosurePanel
                static
                className={twMerge(
                  "text-[var(--color-text-2)]",
                  descriptionClass
                )}
              >
                {children || description}
              </DisclosurePanel>
            </div>
          </div>
        );
      }}
    </Disclosure>
  );
};
