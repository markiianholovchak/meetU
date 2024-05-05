import { PropsWithChildren } from "react";

export const EventCardsContainer = ({ children }: PropsWithChildren) => {
    return <div className="mb-8 flex flex-col gap-4 md:flex-row md:flex-wrap">{children}</div>;
};
