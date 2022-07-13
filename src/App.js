import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoadingBounce } from "@Components/Loading";
import routers from "./routers";
import privateRoute from "./private";
import "./App.css";
import { useSelector } from "react-redux";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  const isAdmin = useSelector((state) => state.account.role === "godAccount");

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingBounce />}>
        <Routes>
          {routers.map((route, index) => {
            return (
              <Route path={route.path} element={route.element} key={index}>
                {route.children &&
                  route.children.map((child, i) => {
                    return (
                      <Route
                        index={child.index}
                        path={child.path}
                        element={child.element}
                        key={i}
                      >
                        {child.children &&
                          child.children.map((item, j) => {
                            return (
                              <Route
                                index={item.index}
                                path={item.path}
                                element={item.element}
                                key={j}
                              />
                            );
                          })}
                      </Route>
                    );
                  })}
                {/* <Route path="*">

                  </Route> */}
              </Route>
            );
          })}
          {isAdmin &&
            privateRoute.map((route, index) => {
              return (
                <Route path={route.path} element={route.element} key={index}>
                  {route.children &&
                    route.children.map((child, i) => {
                      return (
                        <Route
                          index={child.index}
                          path={child.path}
                          element={child.element}
                          key={i}
                        >
                          {child.children &&
                            child.children.map((item, j) => {
                              return (
                                <Route
                                  index={item.index}
                                  path={item.path}
                                  element={item.element}
                                  key={j}
                                />
                              );
                            })}
                        </Route>
                      );
                    })}
                </Route>
              );
            })}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
