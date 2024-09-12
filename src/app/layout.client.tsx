"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={store}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </Provider>
    );
}
