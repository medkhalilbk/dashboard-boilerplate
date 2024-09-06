"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { Provider } from "react-redux"
import { store } from "@/lib/store"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>
    <Provider store={store()}>{children}</Provider>

   </NextThemesProvider>
}
