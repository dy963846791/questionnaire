import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ManageLayout from "../layouts/ManageLayout";
import List from "../pages/manage/List";
import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";
import QuestionLayout from "../layouts/QuestionLayout";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

const HOME_PATH = "/";
const LOGIN_PATHNAME = "/login";
const REGISTER_PATH = "/register";
const MANAGE_LIST_PATHNAME = "/manage/list";
export { HOME_PATH, LOGIN_PATHNAME, REGISTER_PATH, MANAGE_LIST_PATHNAME };
