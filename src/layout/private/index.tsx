import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { Suspense, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom';

import AvatarIcon from '../../assets/avatar.svg';
import Button from '../../common/components/button';
import { FullScreenLoader } from '../../common/components/full-screen-loader';
import { MainNav } from '../../common/components/main-nav';
import { useLogout } from '../../components/auth/service';
import CalculateSalary from '../../components/calculate-salary';
import Clients from '../../components/clients';
import CreateClient from '../../components/clients/create-client';
import EditClient from '../../components/clients/edit-client';
import Dashboard from '../../components/dashboard';
import Salaries from '../../components/salaries';
import Settings from '../../components/settings';

const Layout = () => {
  const { t } = useTranslation();
  const { mutate: logout } = useLogout();

  const handleLogOut = useCallback(() => {
    logout();
  }, [logout]);

  const navigation = useMemo(
    () => [
      { name: t('nav.dashboard'), href: './dashboard', icon: <Squares2X2Icon /> },
      { name: t('nav.calculate-salary'), href: './calculate-salary', icon: <EnvelopeIcon /> },
      { name: t('nav.clients'), href: './clients', icon: <DocumentTextIcon /> },
      { name: t('nav.settings'), href: './settings', icon: <Cog6ToothIcon /> },
    ],
    [t],
  );

  return (
    <div className="bg-blue-50 flex flex-col gap-[1px] h-screen overflow-x-hidden">
      <div className="py-5 px-5 bg-white shadow-sm">
        <div className="flex justify-between h-full items-center">
          <h1 className=" text-blue-500 text-xl">First marine co.</h1>
          <div className="flex items-center gap-14">
            <div>
              <Button className="py-2 px-6  " type="submit">
                {' '}
                <Link to="./calculate-salary" className="flex gap-1 items-center">
                  <PencilSquareIcon className="h-5 w-6" />
                  <span>{t('generate-salary')}</span>
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span>{t('admin')}</span>
              <img src={AvatarIcon} alt="profile" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full ">
        <div className="bg-white  py-5 flex flex-col    gap-7 w-1/4">
          <div className="flex flex-col gap-3">
            <MainNav items={navigation} />
            <div className="pl-6 ">
              <div className="flex gap-3 text-gray-500 cursor-pointer" onClick={handleLogOut}>
                <ArrowRightOnRectangleIcon className="h-6 w-6 " />
                <span>{t('logout')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex  w-full h-full justify-center ">
          <div className="mt-9 w-full ml-14 mr-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivateLayout = () => {
  const routes: RouteObject = {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'calculate-salary',
        element: <CalculateSalary />,
      },
      {
        path: 'clients',
        element: <Clients />,
        children: [
          {
            path: 'add-client',
            element: <CreateClient />,
          },

          {
            path: 'edit-client',
            element: <EditClient />,
          },
        ],
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'salaries',
        element: <Salaries />,
      },

      {
        path: '*',
        element: <Navigate to="dashboard" replace />,
      },
    ],
  };

  const routing = useRoutes([routes]);
  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
};

export default PrivateLayout;
