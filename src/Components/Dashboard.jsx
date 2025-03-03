import { DashboardMain, DashboardSidesheet } from "../Containers";
import axios from "axios";
import urls from "../utils/urls";
import { setAllTeachers } from "../reducers/detailSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();
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
    <div className="bg-gray-200 pt-[100px] w-full flex flex-row justify-start items-center">
      <DashboardSidesheet />
      <DashboardMain />
    </div>
  );
};

export default Dashboard;
