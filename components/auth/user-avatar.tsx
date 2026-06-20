"use client";

import { forwardRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  email: string;
  size?: "default" | "sm" | "lg";
  className?: string;
};

function getEmailInitials(email: string): string {
  const localPart = email.split("@")[0] ?? email;
  const parts = localPart.split(/[._-]+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return localPart.slice(0, 2).toUpperCase();
}

export function UserAvatar({
  email,
  size = "default",
  className,
}: UserAvatarProps) {
  const initials = getEmailInitials(email);

  return (
    <Avatar size={size} className={className}>
      <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

export const UserAvatarTrigger = forwardRef<
  HTMLButtonElement,
  {
    email: string;
    className?: string;
  }
>(function UserAvatarTrigger({ email, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex size-10 touch-manipulation items-center justify-center rounded-full outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={`Account menu for ${email}`}
      {...props}
    >
      <UserAvatar email={email} />
    </button>
  );
});
