/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "../reducers/adminSlice";

const DashboardSidesheet = () => {
  const dispatch = useDispatch();
  const { admin, activePage } = useSelector((store) => store.admin);
  const { role } = admin;

  return (
    <div className="fixed top-[60px] left-0 w-[200px] h-full min-h-[calc(100vh-60px)] bg-gray-50 font-bold flex flex-col justify-start items-start">
      {["Courses", "Teachers"].map((item, index) => {
        return (
          <span
            key={index}
            className={`${
              activePage === item ? "text-blue-500 bg-blue-50" : "text-black"
            } p-4 hover:text-blue-500 hover:bg-blue-50 cursor-pointer w-full`}
            onClick={() => dispatch(setActivePage(item))}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default DashboardSidesheet;
