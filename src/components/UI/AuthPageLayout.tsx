import { PropsWithChildren } from "react";
import { Logo } from "./Logo";

export const AuthPageLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex flex-col gap-6 md:m-auto md:w-[400px]">
            <Logo />
            {children}
        </div>
    );
};
