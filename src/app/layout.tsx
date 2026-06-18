import AOSAnimate from "@/components/animation/aos-animate";
import { Dock } from "@/components/layout/dock";
import { ActiveSectionProvider } from "@/components/layout/active-section-context";
import { BackgroundMusic } from "@/components/layout/background-music";
import ParticlesBackground from "@/components/animation/particles-background";
import SplashLayout from "@/components/splash-screen";
import 'aos/dist/aos.css';
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NHBT",
  description: "PORTFOLIO WEB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveSectionProvider>
            <ParticlesBackground />
            <SplashLayout>
              <NextIntlClientProvider>
                {children}
              </NextIntlClientProvider>
            </SplashLayout>
            <AOSAnimate />
            <Dock />
            <BackgroundMusic />
          </ActiveSectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
