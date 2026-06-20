"use client";

import { useHotkey } from "@tanstack/react-hotkeys";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type * as React from "react";

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  );
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme();

  useHotkey("Control+Alt+D", () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  });

  return null;
}

export { ThemeProvider };
