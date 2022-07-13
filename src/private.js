import React, { lazy } from "react";
import AdminLayout from "@Containers/AdminLayout";
import Blog from "@Containers/Blog";
import AdminLand from "@Containers/AdminLand";
import AdminProject from "@Containers/AdminProject";
import AdminAccount from "@Containers/AdminAccount";
import AllAccount from "@Containers/AdminAccount/AllAccount";
import AllLand from "@Containers/AdminLand/AllLand";
import AddLand from "@Containers/AdminLand/AddLand";
import EditLand from "@Containers/AdminLand/EditLand";
import AllProjects from "@Containers/AdminProject/AllProjects";
import AddProject from "@Containers/AdminProject/AddProject";
import EditProject from "@Containers/AdminProject/EditProject";
import PostedLand from "@Containers/AdminLand/PostedLand";

const routers = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, path: "", element: <Blog /> },
      { index: false, path: "project", element: <AdminProject />,children: [
        { index: true, path: "", element: <AllProjects /> },
        { index: false, path: "add", element: <AddProject /> },
        { index: false, path: "edit/:id", element: <EditProject /> },
      ], },
      {
        index: false,
        path: "land",
        element: <AdminLand />,
        children: [
          { index: true, path: "", element: <AllLand /> },
          { index: false, path: "add", element: <AddLand /> },
          { index: false, path: "edit/:id", element: <EditLand /> },
          { index: false, path: "posted", element: <PostedLand /> },
        ],
      },
      {
        index: false,
        path: "account",
        element: <AdminAccount />,
        children: [{ index: true, path: "", element: <AllAccount /> }],
      },
    ],
  },
];

export default routers;
