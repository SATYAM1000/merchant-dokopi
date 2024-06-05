import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={`w-full px-4 md:px-6 mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
