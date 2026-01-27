import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Super One | Digital Excellence",
    template: "%s | Super One",
  },
  description:
    "Designer, developer, and creative thinker. Building exceptional digital experiences with passion and precision.",
  keywords: [
    "web development",
    "design",
    "developer",
    "portfolio",
    "freelance",
    "digital",
    "creative",
  ],
  authors: [{ name: "Super One" }],
  creator: "Super One",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://superone.dev",
    siteName: "Super One",
    title: "Super One | Digital Excellence",
    description:
      "Designer, developer, and creative thinker. Building exceptional digital experiences with passion and precision.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Super One | Digital Excellence",
    description:
      "Designer, developer, and creative thinker. Building exceptional digital experiences with passion and precision.",
    creator: "@superone",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
