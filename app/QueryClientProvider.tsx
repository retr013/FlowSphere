'use client'

import {QueryClient, QueryClientProvider as ClientProvider} from "@tanstack/react-query";
import {PropsWithChildren} from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {

    return (
        <ClientProvider client={queryClient}>
            {children}
        </ClientProvider>
    );
};

export default QueryClientProvider;
