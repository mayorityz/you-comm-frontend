import React from "react";
import Navigation from "../Navigation";

const Wrapper = ({ component: Component }) => {
  return (
    <>
      <Navigation />
      <Component />
    </>
  );
};

export default Wrapper;
