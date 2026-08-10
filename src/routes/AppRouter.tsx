import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import {
  authRequireLoader,
  getUserLoader,
  redirectIfAuth,
} from "./loaders/authLoader";

const Home = lazy(() => import("@/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const VehiclesPage = lazy(() => import("@/pages/vehicles/VehiclesPage"));
const DevicePage = lazy(() => import("@/pages/device/DevicePage"));
const TrackPage = lazy(() => import("@/pages/track/TrackPage"));

// const UsersPage = lazy(() => import('@/pages/users/UsersPage'))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    loader: getUserLoader,
    children: [
      {
        loader: authRequireLoader,
        children: [
          { index: true, Component: Home },
          {
            path: "cars",
            children: [
              { index: true, Component: VehiclesPage },
              {
                path: "device",
                children: [{ path: ":id", Component: DevicePage }],
              },
              {
                path: "track",
                children: [{ path: ":id", Component: TrackPage }],
              },
            ]
          }
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  {
    path: "auth",
    element: <AuthLayout />,
    loader: redirectIfAuth,
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
    ],
  },
]);
