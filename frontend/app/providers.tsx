"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Global providers wrapper
 * Keeps QueryClient stable across renders
 */
export function Providers({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}
