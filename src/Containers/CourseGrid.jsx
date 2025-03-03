/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import axios from "axios";
import urls from "../utils/urls";
import { useDispatch } from "react-redux";
import { setAllCourses } from "../reducers/detailSlice";
import { useEffect, useState } from "react";
const CourseGrid = ({ courses = [] }) => {
  const dispatch = useDispatch();
  const [courseLevel, setCourseLevel] = useState("All");
  const [courseLocation, setCourseLocation] = useState("All");
  const getAllCourse = async () => {
    const response = await axios
      .get(
        `${urls.getCourses}?course_level=${courseLevel}&course_location=${courseLocation}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if (response && response.status) {
      dispatch(setAllCourses(response.courses));
    }
  };
  useEffect(() => {
    getAllCourse();
  }, [courseLevel, courseLocation]);
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="text-[20px] font-bold pb-[10px]">All Courses</span>
        <div className="ml-auto flex flex-row justify-start items-center gap-[10px]">
          <span>Course Level</span>
          <select
            className="p-2 rounded-[5px] outline-none"
            value={courseLevel}
            onChange={({ target: { value } }) => {
              setCourseLevel(value);
            }}
          >
            {["All", "Beginner", "Intermediate", "Advance"].map(
              (level, index) => {
                return (
                  <option value={level} key={index}>
                    {level}
                  </option>
                );
              }
            )}
          </select>
        </div>
        <div className="flex flex-row justify-start items-center gap-[10px]">
          <span>Location</span>
          <select
            className="p-2 rounded-[5px] outline-none"
            value={courseLocation}
            onChange={({ target: { value } }) => {
              setCourseLocation(value);
            }}
          >
            {[
              "All",
              "India",
              "US and Canada",
              "Middle East",
              "Europe",
              "Australia",
            ].map((level, index) => {
              return (
                <option value={level} key={index}>
                  {level}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Link
        to={"/create-course"}
        className="py-2 px-3 bg-mainColor font-semibold !text-white w-max rounded-[5px] cursor-pointer"
      >
        Create New Course
      </Link>
      <div className="grid grid-cols-3 gap-4 text-[12px] font-semibold">
        {courses.map((singleClass, index) => {
          return (
            <div
              key={index}
              className="p-4 flex flex-col justify-start items-start gap-[10px] bg-lightGrey rounded-[5px] shadow-2xl"
            >
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-mainColor font-bold">Course ID</span>
                <span className="font-black">{singleClass.id}</span>
              </div>
              <div className="flex flex-row items-center gap-[15px]">
                <div>
                  <img src={Logo} className="w-[30px]" alt="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[20px] font-bold">
                    {singleClass.name}
                  </span>
                  <span>{singleClass.courseLevel}</span>
                </div>
              </div>
              <span>
                Class
                <span className="pl-[10px] text-unHighlightDark font-semibold text-[15px]">
                  {singleClass.courseClass}
                </span>
              </span>
              <span>
                Location
                <span className="pl-[10px] text-unHighlightDark font-semibold text-[15px]">
                  {singleClass.relevantLocation}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseGrid;
