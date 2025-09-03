import React, { Suspense } from "react";
import RootClient from "./RootClient";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RootClient />
    </Suspense>
  );
};

export default page;
