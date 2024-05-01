import { PropsWithChildren } from "react";

type WithLabelProps = PropsWithChildren & {
    label: string;
};
export const WithLabel = ({ label, children }: WithLabelProps) => {
    return (
        <div className={`flex flex-col `}>
            <label htmlFor={label} className="font-medium text-primaryText">
                {label}
            </label>
            {children}
        </div>
    );
};
