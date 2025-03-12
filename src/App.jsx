import { useSelector } from "react-redux";
import {
  AddTeacher,
  ClassFeedbackForm,
  CreateClass,
  CreateCourse,
  Dashboard,
  Navbar,
} from "./Components";
import Login from "./Components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
const App = () => {
  const { isLoggedIn } = useSelector((store) => store.admin);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        ></Route>
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/create-class" element={<CreateClass />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/feedback/:classId"
          element={
            isLoggedIn ? <ClassFeedbackForm /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
};

export default App;
