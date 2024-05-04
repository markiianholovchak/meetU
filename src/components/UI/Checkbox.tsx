import { InputHTMLAttributes } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    checked: boolean;
    onChange: (value: boolean) => void;
};
export const Checkbox = ({ checked, onChange, ...props }: CheckboxProps) => {
    return (
        <input
            checked={checked}
            onChange={() => onChange(!checked)}
            type="checkbox"
            className=" bg-transparent accent-crimson"
            {...props}
        />
    );
};
