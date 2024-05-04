import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    leftIcon?: ReactNode;
    required?: boolean;
};
export const Input = ({ value, onChange, label, required, leftIcon, ...props }: InputProps) => {
    return (
        <div className={`flex flex-col `}>
            <label htmlFor={label} className="font-medium text-primaryText">
                {label}
                {required && <span className="text-crimson">*</span>}
            </label>

            <div className="flex items-center gap-2 rounded-md bg-darkGray px-3 py-2">
                {leftIcon}
                <input
                    id={label}
                    name={label}
                    className={`w-full bg-transparent placeholder:text-sm placeholder:text-primaryText placeholder:opacity-50 ${props.disabled ? "opacity-60" : ""}`}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    {...props}
                />
            </div>
        </div>
    );
};
