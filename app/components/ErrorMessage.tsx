import React, { PropsWithChildren } from "react";
import { Callout } from "@radix-ui/themes";

interface Props {
    className?: string;
}

export const ErrorMessage = ({ children, className = '' }: PropsWithChildren<Props>) => {
    if (!children) {
        return null;
    }
    return (
        <Callout.Root className={`text-red-500 ${className}`}>
            {children}
        </Callout.Root>
    );
};
