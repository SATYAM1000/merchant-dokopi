import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={`w-full px-4 max-lg:px-1 mx-auto ${className || ""
        }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
