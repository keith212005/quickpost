import * as React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({
    children,
    ...props
  }: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}