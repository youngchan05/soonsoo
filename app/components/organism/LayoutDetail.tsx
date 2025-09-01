import React from "react";
import TopBar from "../molecule/TopBar";

const LayoutDetail = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  title?: string;
  backHref?: string;
  rightSlot?: React.ReactNode;
  variant?: "solid" | "transparent";
  className?: string;
}) => (
  <>
    <TopBar {...props} />
    {children}
  </>
);

export default LayoutDetail;
