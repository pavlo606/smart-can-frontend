import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import {
  AdminRequireLoader,
  authRequireLoader,
  getUserLoader,
  redirectIfAuth,
} from './loaders/authLoader'

const Home = lazy(() => import('@/pages/home/HomePage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
// const ClientsPage = lazy(() => import('@/pages/clients/ClientsPage'))
// const ClientDetailsPage = lazy(() => import('@/pages/clients/ClientsDetailsPage'))
// const EmployeesPage = lazy(() => import('@/pages/employees/EmployeesPage'))
// const EmployeeDetailsPage = lazy(() => import('@/pages/employees/EmployeesDetailsPage'))
// const ProjectsPage = lazy(() => import('@/pages/projects/ProjectsPage'))
// const ProjectsDetailsPage = lazy(() => import('@/pages/projects/ProjectsDetailsPage'))
// const InventoryPage = lazy(() => import('@/pages/inventory/InventoryPage'))
// const InventoryDetailsPage = lazy(() => import('@/pages/inventory/InventoryDetailsPage'))
// const InventoryCategoryPage = lazy(() => import('@/pages/inventory/InventoryCategoryPage'))
// const ManufacturerPage = lazy(() => import('@/pages/manufacturer/ManufacturerPage'))
// const ManufacturerDetailsPage = lazy(() => import('@/pages/manufacturer/ManufacturerDetailsPage'))
// const FixedAssetsPage = lazy(() => import('@/pages/fixedAssets/FixedAssetsPage'))
// const FixedAssetsCategoryPage = lazy(() => import('@/pages/fixedAssets/FixedAssertsCategoryPage'))

// const UsersPage = lazy(() => import('@/pages/users/UsersPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const MainLayout = lazy(() => import('@/layouts/MainLayout'))
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'))

export const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    loader: getUserLoader,
    children: [
      {
        loader: authRequireLoader,
        children: [
          { index: true, Component: Home },
          // {
          //   path: 'dashboard',
          //   Component: Home,
          // },
          {
            path: 'fuck',
            element: <div>You're fucking cool</div>
          }
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  {
    path: 'auth',
    element: <AuthLayout />,
    loader: redirectIfAuth,
    children: [
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
    ],
  },
])
