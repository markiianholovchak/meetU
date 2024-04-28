import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    leftIcon?: ReactNode;
};
export const Input = ({ value, onChange, label, leftIcon, ...props }: InputProps) => {
    return (
        <div className={`flex flex-col `}>
            <label htmlFor={label} className="text-primaryText font-medium">
                {label}
            </label>
            <div className="bg-darkGray flex items-center gap-2 rounded-md px-3 py-2">
                {leftIcon}
                <input
                    id={label}
                    name={label}
                    className={`placeholder:text-primaryText bg-transparent placeholder:opacity-50 ${props.disabled ? "opacity-60" : ""}`}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    {...props}
                />
            </div>
        </div>
    );
};
