import { RadioGroup } from "@headlessui/react";

type RadioGroupProps<T> = {
    selected: T;
    placeholder?: string;
    onChange: (value: T) => void;
    options: SelectItem<T>[];
};

const CheckedRadio = () => {
    return (
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-crimson ">
            <div className="h-[8px] w-[8px] rounded-full bg-darkGray"></div>
        </div>
    );
};

const UnCheckedRadio = () => {
    return (
        <div className="flex h-4 w-4 items-center justify-center rounded-full border border-2 border-darkGray "></div>
    );
};
export function RadioGroupInput<T>({ selected, onChange, options }: RadioGroupProps<T>) {
    return (
        <RadioGroup value={selected} onChange={onChange} className="flex flex-col gap-2">
            {options.map(option => {
                return (
                    <RadioGroup.Option
                        key={option.label}
                        value={option.value}
                        className="flex items-center gap-2"
                    >
                        {({ checked }) => (
                            <>
                                {checked ? <CheckedRadio /> : <UnCheckedRadio />}
                                <p className="text-sm">{option.label} </p>
                            </>
                        )}
                    </RadioGroup.Option>
                );
            })}
        </RadioGroup>
    );
}
