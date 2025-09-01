import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/Footer";
import Header from "../components/organism/Header/Header";
import TabBar from "../components/organism/NavBar";
import QueryProvider from "../providers/QueryProvider";
import LayoutDetail from "../components/organism/LayoutDetail";
import CartBadgeButton from "../components/molecule/CartBadgeButton";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700&family=Noto+Sans+KR:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[color-mix(in_oklab,var(--surface-1)_86%,white)]">
        <QueryProvider>
          <LayoutDetail
            title="Products"
            rightSlot={
              <a href="/cart">
                <CartBadgeButton />
              </a>
            }
          >
            {children}
          </LayoutDetail>
        </QueryProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
