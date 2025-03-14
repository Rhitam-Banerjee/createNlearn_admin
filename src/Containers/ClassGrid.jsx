/* eslint-disable react/prop-types */
import { Logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import urls from "../utils/urls";
import { setAllClasses } from "../reducers/detailSlice";
import { Link } from "react-router-dom";
const ClassGrid = () => {
  const dispatch = useDispatch();
  const { allTeachers, allClasses } = useSelector((store) => store.details);
  const [classType, setClassType] = useState("All");
  const [activeTeacher, setActiveTeacher] = useState("all");

  const getAllClass = async () => {
    const response = await axios
      .get(
        `${urls.getClasses}?teacher_id=${activeTeacher}&class_type=${classType}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if (response && response.status) {
      dispatch(setAllClasses(response.classes));
    }
  };

  useEffect(() => {
    getAllClass();
  }, [classType, activeTeacher]);

  return (
    <div className="mt-[50px] flex flex-col gap-[10px]">
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <span className="text-[20px] font-bold pb-[10px]">Classes</span>
        <div className="ml-auto flex flex-row justify-start items-center gap-[10px]">
          <span>Class Type</span>
          <select
            className="p-2 rounded-[5px] outline-none"
            value={classType}
            onChange={({ target: { value } }) => {
              setClassType(value);
            }}
          >
            {["All", "upcomming", "ongoing", "past"].map((level, index) => {
              return (
                <option value={level} key={index}>
                  {level.toUpperCase()}
                </option>
              );
            })}
          </select>
        </div>
        {allTeachers?.length > 0 && (
          <div className="flex flex-row justify-start items-center gap-[10px]">
            <span>Teachers</span>
            <select
              className="min-w-[100px] p-2 rounded-[5px] outline-none"
              value={activeTeacher}
              onChange={({ target: { value } }) => {
                setActiveTeacher(value);
              }}
            >
              {allTeachers?.map((level, index) => {
                return (
                  <option value={level.id} key={index}>
                    {level.name}
                  </option>
                );
              })}
              <option value="all">All</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 text-[12px] font-semibold">
        {allClasses?.map((singleClass, index) => {
          return (
            <div
              key={index}
              className="p-4 flex flex-col justify-start items-start gap-[10px] bg-lightGrey rounded-[5px] shadow-2xl"
            >
              <div>
                Class ID -{" "}
                <span className="pl-[10px] text-mainColor font-bold">
                  {singleClass.id}
                </span>
              </div>
              <div className="flex flex-row items-center gap-[15px]">
                <div>
                  <img src={Logo} className="w-[30px]" alt="" />
                </div>
                <div className="flex flex-col">
                  <span>{singleClass.title}</span>
                </div>
              </div>
              <span>Date - {singleClass.date}</span>
              <span>
                Time - {singleClass.class_start?.slice(0, -3)} -{" "}
                {singleClass.class_end?.slice(0, -3)}
              </span>
              <span>
                No of students
                <span className="pl-[10px] text-mainColor font-semibold">
                  {singleClass.studentCount}
                </span>
              </span>
              <span>
                Teacher ID
                <span className="pl-[10px] text-mainColor font-semibold">
                  {singleClass.teacher_id}
                </span>
              </span>
              <span>
                Teacher
                <span className="pl-[10px] text-mainColor font-semibold">
                  {singleClass.teacher}
                </span>
              </span>
              <div className="flex flex-row flex-wrap gap-[10px]">
                {singleClass.studentName.map((student, index) => {
                  return (
                    <div
                      key={index}
                      className="border-mainColor border-[2px] text-mainColor px-2 py-1 rounded-[5px]"
                    >
                      {student}
                    </div>
                  );
                })}
              </div>
              {singleClass.is_complete && (
                <Link
                  to={`/feedback/${singleClass.id}`}
                  className="p-2 !text-white bg-successGreen rounded-[5px] text-[12px] font-bold cursor-pointer"
                >
                  View Form
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassGrid;
