import type { Metadata } from "next";
import "../../globals.css";
import QueryProvider from "@/app/providers/QueryProvider";
import LayoutDetail from "@/app/components/organism/LayoutDetail";

export const metadata: Metadata = {
  title: "soonsoo flower shop",
  description: "korean flower",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700&family=Noto+Sans+KR:wght@400;500;600&display=swap"
          rel="stylesheet"
        /> */}
      </head>
      <body className="min-h-screen bg-[color-mix(in_oklab,var(--surface-1)_86%,white)]">
        <QueryProvider>
          <LayoutDetail title="Cart">{children}</LayoutDetail>
        </QueryProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
