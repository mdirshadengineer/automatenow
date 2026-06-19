import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono, Source_Sans_3 } from "next/font/google";
import ShadcnProvider from "@/components/shadcn-provider";
import { cn } from "@/lib/utils";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        sourceSans3.variable,
      )}
    >
      <body>
        <ShadcnProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ShadcnProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
