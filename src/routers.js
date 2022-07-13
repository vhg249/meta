import React, { lazy } from "react";
import Dashboard from "@Containers/Dashboard";
import FAQ from "@Containers/FAQ";
import Leaderboard from "@Containers/Leaderboard";
import MarketDetail from "@Containers/Marketplace/MarketDetail";
import MarketList from "@Containers/Marketplace/MarketList";
import RegularAuction from "@Containers/Marketplace/RegularAuction";
import MyLand from "@Containers/MyLand";
import MyLandList from "@Containers/MyLand/MyLandList";
import News from "@Containers/News";
import NewsDetail from "@Containers/News/NewsDetail";
import NewsList from "@Containers/News/NewsList";
import Profile from "@Containers/Profile";
import Land from "@Containers/Land";
import  LandDetail from "@Containers/Land/LandDetail";
import LandList from "@Containers/Land/LandList";
import ProjectDetail from "@Containers/Land/ProjectDetail";
import Voting from "@Containers/MyLand/Voting";
import Layout from "@Containers/Layout";
import Home from "@Containers/Home";
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
import ReverseAction from "./containers/MyLand/LayoutOption/ReverseAction";
import RegularAction from "./containers/MyLand/LayoutOption/RegularAction";
import MyLandDetail from "@Containers/MyLand/LayoutOption/MyLandDetail";
import PageNotFoundLand from "./components/PageNotFound/PageNotFoundLand";
import MarketLand from "@Containers/MarketLand";

const Marketplace = lazy(() => import("@Containers/Marketplace"));

const routers = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "", element: <Home /> },
      {
        index: false,
        path: "marketplace",
        element: <MarketList />,
      },
      {
        index: false,
        path: "detail/:detailId",
        element: <MarketDetail />,
      },
      {
        index: false,
        path: "land",
        element: <Land />,
        children: [
          { index: true, path: "", element: <LandList /> },
          {
            index: false,
            path: ":projectPath",
            element: <ProjectDetail />,
          },
          // {
          //   index: true,
          //   path: ":projectPath/:landName",
          //   element: <LandDetail />,
          // },
        ],
      },
      {
        index: false,
        path: "my-land",
        element: <MyLand />,
        children: [
          { index: true, path: "", element: <MyLandList /> },
          { index: false, path: ":landId", element: <MyLandDetail /> },
          { index: false, path: "reverse-auction/:landId", element: <ReverseAction /> },
          { index: false, path: "regular-auction/:landId", element: <RegularAction /> },
          { index: false, path: "voting/:landId", element: <Voting /> }
        ]
      },
      {
        index: false,
        path: "profile",
        element: <Profile />,
      },
      {
        index: false,
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        index: false,
        path: "news",
        element: <News />,
        children: [
          { index: true, path: "", element: <NewsList /> },
          { index: false, path: ":newsId", element: <NewsDetail /> },
        ],
      },
      {
        index: false,
        path: "faq",
        element: <FAQ />,
      },
      {
        index: false,
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        index: false,
        path: "market-land",
        element: <MarketLand />,
      },
    ],
  },
  {
    path:"land/:projectPath/:landName",
    element: <LandDetail />,
  },
  {
    path: "/page-not-found",
    element: <PageNotFoundLand />,
  }
];

export default routers;
