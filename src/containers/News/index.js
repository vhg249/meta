import React, { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { NewsContext } from "./NewsContext";

const News = () => {
  const [newData, setNewData] = useState(
    JSON.parse(localStorage.getItem("new"))
  );
  const value = useMemo(() => ({ newData, setNewData }), [newData]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default News;
