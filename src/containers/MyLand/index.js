import React, { useState, useMemo } from "react";
import { MyLandContext } from "./Context";
import { Outlet } from "react-router-dom";

const MyLand = () => {
  const [myLand, setMyLand] = useState(
    JSON.parse(localStorage.getItem("myLand"))
  );
  const value = useMemo(() => ({ myLand, setMyLand }), [myLand]);
  return (
    <>
      <MyLandContext.Provider value={value}>
        <Outlet />
      </MyLandContext.Provider>
    </>
  );
};

export default MyLand;
