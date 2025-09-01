import React, { ReactNode } from "react";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "soonsoo flower shop Singup",
  description: "korean flower",
};

const Forgotayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
};

export default Forgotayout;
