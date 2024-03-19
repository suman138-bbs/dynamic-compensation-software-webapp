import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { MainNavProps } from './models';

export const MainNav: React.FC<MainNavProps> = ({ items }) => {
  const { pathname } = useLocation();

  return (
    <div className="w-full flex flex-col">
      {items.map((item, index) => (
        <div key={index} className="relative">
          <NavLink
            to={item.href}
            className={({ isActive }) =>
              classNames(
                'text-gray-600 flex items-center justify-start pl-5 py-2',
                isActive ? 'border-r-4 border-blue-500 bg-blue-50' : '',
              )
            }
          >
            {React.cloneElement(item.icon, {
              className: `h-6 w-6 ${pathname.includes(item.href.replace('.', '')) ? 'text-blue-600' : 'text-gray-500'}`,
            })}

            <span
              className={`ml-3 text-base font-normal ${
                pathname.includes(item.href.replace('.', '')) ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {item.name}
            </span>
          </NavLink>
          {(index + 1) % 3 === 0 && <hr className="w-52  bg-gray-200 my-6 ml-5" />}
        </div>
      ))}
    </div>
  );
};
