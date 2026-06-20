import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 self-center font-medium"
        >
          <Image
            src="/automatenow.png"
            alt="AutomateNow Logo"
            className="size-8"
            width={32}
            height={32}
            loading="eager"
          />
          AutomateNow
        </Link>
        {children}
      </div>
    </div>
  );
}
