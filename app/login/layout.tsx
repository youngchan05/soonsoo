import React, { ReactNode } from "react";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "soonsoo flower shop Login",
  description: "korean flower",
};

const Loginlayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
};

export default Loginlayout;
