import Link from "next/link";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import { UserChrome } from "@/components/auth/user-chrome";

type HeaderProps = {
  initialUser: User | null;
};

export function Header({ initialUser }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b bg-background/80 backdrop-blur-xs">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Image
            src="/automatenow.png"
            alt="AutomateNow"
            className="size-7"
            width={28}
            height={28}
            loading="eager"
          />
          AutomateNow
        </Link>

        <UserChrome initialUser={initialUser} />
      </div>
    </header>
  );
}
