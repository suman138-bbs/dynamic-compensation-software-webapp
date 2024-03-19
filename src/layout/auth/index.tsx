import React, { Suspense } from 'react';

import { Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom';
import { FullScreenLoader } from '../../common/components/full-screen-loader';

const LazyAuthLogin = React.lazy(() => import('../../components/auth/login'));
const LazyAuthForgotPassword = React.lazy(() => import('../../components/auth/forgot-password'));
const LazyAuthAccountActivation = React.lazy(() => import('../../components/auth/activate-account'));
const LazyAuthResetPassword = React.lazy(() => import('../../components/auth/reset-password'));

const Layout = () => {
  return (
    <div className="relative">
      <h1 className="absolute top-4 left-6 text-blue-500 text-xl">First marine co.</h1>
      <Outlet />
    </div>
  );
};

const AuthLayout = () => {
  const routes: RouteObject = {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <LazyAuthLogin />,
      },
      {
        path: 'forgot-password',
        element: <LazyAuthForgotPassword />,
      },
      {
        path: 'activate-account',
        element: <LazyAuthAccountActivation />,
      },
      {
        path: 'reset-password',
        element: <LazyAuthResetPassword />,
      },
      {
        path: '*',
        element: <Navigate to="login" replace />,
      },
    ],
  };
  const routing = useRoutes([routes]);

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default AuthLayout;
