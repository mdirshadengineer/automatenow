"use client";

import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const THEME_OPTIONS = [
  { value: "dark", label: "Dark", icon: IconMoon },
  { value: "light", label: "Light", icon: IconSun },
  { value: "system", label: "System", icon: IconDeviceDesktop },
] as const;

export function ThemeMenuSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Theme</DropdownMenuLabel>
      <DropdownMenuRadioGroup
        value={theme ?? "system"}
        onValueChange={setTheme}
      >
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon;

          return (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              <Icon className="size-4" />
              {option.label}
            </DropdownMenuRadioItem>
          );
        })}
      </DropdownMenuRadioGroup>
      <DropdownMenuSeparator />
    </>
  );
}
