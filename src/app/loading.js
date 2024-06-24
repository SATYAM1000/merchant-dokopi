import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <section className=" relative w-full h-[calc(100vh-64px)] flex items-center justify-center">
      <ClipLoader color="blue" size={60} />
    </section>
  );
};

export default Loading;
