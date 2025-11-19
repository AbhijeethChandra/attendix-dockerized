import { Radio, RadioGroup } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export const CommonRadio = (props) => {
  const { value, onChange, radios, className } = props;

  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className={twMerge("flex gap-5 flex-wrap", className)}
    >
      {radios.map((radio) => (
        <Radio
          value={radio.value}
          className="group flex flex-col gap-2 gap-2 justify-center cursor-pointer"
        >
          <div className="flex space-x-2 items-center">
            <div className="size-4 flex w-fit rounded-full border border-[var(--color-radio-border)] p-1 justify-center items-center">
              <span className="size-2 rounded-full bg-[var(--color-radio-dot)] opacity-0 group-data-checked:opacity-100" />
            </div>
            <span>{radio.label}</span>
          </div>
        </Radio>
      ))}
    </RadioGroup>
  );
};
