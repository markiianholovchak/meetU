import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { Listbox } from "@headlessui/react";
import { Fragment } from "react";
import { FaChevronDown } from "react-icons/fa";
import { handleEmptyString } from "../../lib/helpers";

type SelectProps<T> = {
    selected: T | null;
    placeholder?: string;
    onChange: (value: T | null) => void;
    options: SelectItem<T>[];
};
export function Select<T>({ selected, onChange, placeholder, options }: SelectProps<T>) {
    const { x, y, refs, strategy } = useFloating({
        middleware: [offset(10), flip(), shift()],
        whileElementsMounted: autoUpdate,
        strategy: "absolute"
    });

    return (
        <Listbox
            value={selected}
            onChange={newValue => onChange(newValue)}
            as={"div"}
            className={
                "relative  flex cursor-pointer items-center justify-center rounded-md bg-darkGray  px-4  py-2  text-center text-sm font-medium outline-1 outline-purple-900"
            }
            ref={refs.setReference}
        >
            <Listbox.Button className={"flex w-full items-center justify-between"}>
                {selected ? (
                    <span>
                        {handleEmptyString(
                            options.find(option => option.value === selected)?.label || ""
                        )}
                    </span>
                ) : (
                    <span className="text-primaryText opacity-50">{placeholder}</span>
                )}
                <FaChevronDown className="text-primaryText opacity-50" />
            </Listbox.Button>
            <Listbox.Options as={Fragment}>
                {({ open }) =>
                    open ? (
                        <div
                            ref={refs.setFloating}
                            className={
                                "border-gray-border mt-2 flex w-max min-w-[150px] list-none flex-col gap-3 rounded-lg border bg-darkGray p-4 text-left"
                            }
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                                zIndex: 10
                            }}
                        >
                            {options.map((item, index) => {
                                return (
                                    <Listbox.Option
                                        key={index}
                                        value={item.value}
                                        disabled={item.disabled}
                                    >
                                        {({ active }) => (
                                            <div
                                                className={`h-full w-full border-b border-b-gray-700 ${
                                                    active ? "text-crimson" : ""
                                                }`}
                                            >
                                                {item.label}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                );
                            })}
                        </div>
                    ) : (
                        <div></div>
                    )
                }
            </Listbox.Options>
        </Listbox>
    );
}
