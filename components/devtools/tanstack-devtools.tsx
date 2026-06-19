"use client";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

export function TanStackDevtoolsPanel() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <TanStackDevtools config={{
      position: "top-right"
    }}
      plugins={[
        {
          name: "TanStack Query",
          render: <ReactQueryDevtoolsPanel />,
        },
        {
          name: "TanStack Form",
          render: <FormDevtoolsPanel />,
        },
      ]}
    />
  );
}
