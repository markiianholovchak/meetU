import { PropsWithChildren } from "react";

type WithLabelProps = PropsWithChildren & {
    label: string;
    required?: boolean;
};
export const WithLabel = ({ label, required, children }: WithLabelProps) => {
    return (
        <div className={`flex flex-col `}>
            <label htmlFor={label} className="font-medium text-primaryText">
                {label}
                {required && <span className="text-crimson">*</span>}
            </label>
            {children}
        </div>
    );
};
