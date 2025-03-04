import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ClassGrid, CourseGrid, Teachers } from "./";
import axios from "axios";
import urls from "../utils/urls";
import { setAllTeachers } from "../reducers/detailSlice";
import { useEffect } from "react";
const DashboardMain = () => {
  const dispatch = useDispatch();
  const { activePage } = useSelector((store) => store.admin);
  const { allCourses } = useSelector((store) => store.details);
  const getAllTeacher = async () => {
    const response = await axios
      .get(`${urls.getAllTeachers}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    if (response && response.status) {
      dispatch(setAllTeachers(response.teachers));
    }
  };
  useEffect(() => {
    getAllTeacher();
  }, []);
  return (
    <div className="ml-[200px] w-full h-full min-h-[calc(100vh-60px)] p-[50px]">
      {activePage === "Courses" ? (
        <>
          <CourseGrid courses={allCourses} />
          <ClassGrid />
        </>
      ) : (
        <Teachers />
      )}
    </div>
  );
};

export default DashboardMain;
