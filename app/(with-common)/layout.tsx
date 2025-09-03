import type { Metadata } from "next";
import "../globals.css";
import Header from "../components/organism/Header/Header";
import QueryProvider from "../providers/QueryProvider";
import NavBar from "../components/organism/NavBar";

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
      <body className="min-h-screen bg-[var(--surface-1)] pb-10">
        <Header />
        <QueryProvider>{children}</QueryProvider>
        <NavBar />
      </body>
    </html>
  );
}
