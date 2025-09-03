import React, { Suspense } from "react";
import CartClient from "./CartClient";

const page = () => {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <CartClient />
    </Suspense>
  );
};

export default page;
