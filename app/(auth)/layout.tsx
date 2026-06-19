import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Image
              src="/automatenow.png"
              alt="AutomateNow Logo"
              className="size-4"
              width={16}
              height={16}
              loading="eager"
            />
          </div>
          AutomateNow
        </Link>
        {children}
      </div>
    </div>
  )
}
