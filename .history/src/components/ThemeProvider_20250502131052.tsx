import * as React from React;
import { ThemeProvider } from "next-themes";

export function ThemeProviderWrapper({ children }: any) {
    return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}