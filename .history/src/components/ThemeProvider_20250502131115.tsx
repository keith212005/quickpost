import * as React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProviderWrapper({ children }: any) {
    return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}