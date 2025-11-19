import { Radio, RadioGroup } from "@headlessui/react";

export const CommonRadio = (props) => {
  const { value, onChange, radios, className } = props;

  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="grid grid-cols-2 gap-x-3"
    >
      {radios.map((radio) => (
        <Radio
          value={radio.value}
          className="group flex flex-col gap-2 gap-2 justify-center cursor-pointer"
        >
          <div className="flex space-x-2 items-center">
            <div className="size-5 flex w-fit rounded-full border p-1 justify-center items-center">
              <span className="size-2.5 rounded-full bg-white opacity-0 group-data-checked:opacity-100" />
            </div>
            <span>{radio.label}</span>
          </div>
        </Radio>
      ))}
    </RadioGroup>
  );
};
