import React from 'react';

import { salaryType } from './models';

const SalaryDeatails = ({ icon, salaryInfo, time, amount, className }: salaryType) => {
  return (
    <div className=" flex flex-col gap-2 bg-white px-6 py-4 shadow-sm  rounded-md">
      <div className="flex flex-col gap-4 w-48">
        <div className="flex gap-3 items-center ">
          <div className={`${className} py-3 px-2 rounded-sm`}>
            {React.cloneElement(icon, {
              className: 'h-6 w-6 ',
            })}
          </div>
          <div>
            <p className="text-black text-lg font-normal">{salaryInfo}</p>
            <span className=" text-gray-600 ">{time}</span>
          </div>
        </div>
        <div className="text-2xl font-bold flex gap-1">
          <span>$</span>
          <span>{amount}</span>
        </div>
      </div>
      <div className="bg-blue-50 w-full h-2 rounded-lg">
        <div className="bg-green-400 w-32 h-full rounded-lg"></div>
      </div>
    </div>
  );
};

export default SalaryDeatails;
