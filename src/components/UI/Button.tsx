import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: ButtonVariant;
};
export const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
    const commonStyles = "rounded px-4 py-2";
    const variantStyles: Record<ButtonVariant, string> = {
        primary: "bg-crimson " + commonStyles,
        outlined: "border border-border " + commonStyles,
        unstyled: ""
    };

    return (
        <button {...props} className={` ${variantStyles[variant]} ${props.className}`}>
            {children}
        </button>
    );
};
