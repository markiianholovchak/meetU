import { ReactNode, TextareaHTMLAttributes } from "react";

type InputProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> & {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    leftIcon?: ReactNode;
};
export const TextArea = ({ value, onChange, label, leftIcon, className, ...props }: InputProps) => {
    return (
        <div className={`flex h-full w-full flex-col `}>
            <label htmlFor={label} className="font-medium text-primaryText">
                {label}
            </label>
            <div className="flex items-center gap-2 rounded-md bg-darkGray px-3 py-2">
                {leftIcon}
                <textarea
                    id={label}
                    name={label}
                    className={`h-full min-h-[100px] w-full bg-transparent placeholder:text-sm placeholder:text-primaryText placeholder:opacity-50 ${props.disabled ? "opacity-60" : ""} ${className}`}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    {...props}
                />
            </div>
        </div>
    );
};
